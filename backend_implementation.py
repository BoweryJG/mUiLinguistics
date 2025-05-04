from fastapi import FastAPI, Depends, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import stripe
import jwt
from supabase import create_client
from datetime import datetime, timedelta
import json
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://muilinguistics.netlify.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Authorization", "X-User-ID"],
)

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

# Initialize Stripe (for subscriptions)
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
stripe_webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET")

# Define models
class AudioRequest(BaseModel):
    filename: str

class UserLimit(BaseModel):
    tier: str = "free"
    monthly_quota: int = 10
    max_file_size: int = 25000000
    usage_reset_date: datetime = None

# User authentication middleware
async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    try:
        # Parse JWT token
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, options={"verify_signature": False})
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication error: {str(e)}")

# Usage tracking functions
async def get_user_limits(user_id: str):
    try:
        response = supabase.table("user_limits").select("*").eq("user_id", user_id).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        else:
            # Create default limits for new user
            default_limits = UserLimit()
            default_limits.usage_reset_date = datetime.now() + timedelta(days=30)
            response = supabase.table("user_limits").insert({
                "user_id": user_id,
                "tier": default_limits.tier,
                "monthly_quota": default_limits.monthly_quota,
                "max_file_size": default_limits.max_file_size,
                "usage_reset_date": default_limits.usage_reset_date.isoformat()
            }).execute()
            return response.data[0] if response.data else default_limits.dict()
    except Exception as e:
        print(f"Error getting user limits: {str(e)}")
        return UserLimit().dict()

async def get_current_usage(user_id: str):
    try:
        # Get reset date
        limits_response = supabase.table("user_limits").select("usage_reset_date").eq("user_id", user_id).execute()
        reset_date = None
        if limits_response.data and len(limits_response.data) > 0:
            reset_date = limits_response.data[0].get("usage_reset_date")
        
        # Count usage since reset date
        query = supabase.table("user_usage").select("id", count="exact").eq("user_id", user_id)
        if reset_date:
            query = query.gte("created_at", reset_date)
        
        response = query.execute()
        return response.count if hasattr(response, 'count') else 0
    except Exception as e:
        print(f"Error getting current usage: {str(e)}")
        return 0

async def log_usage(user_id: str, request_type: str, file_size: int = 0):
    try:
        response = supabase.table("user_usage").insert({
            "user_id": user_id,
            "request_type": request_type,
            "file_size": file_size,
            "created_at": datetime.now().isoformat()
        }).execute()
        return True
    except Exception as e:
        print(f"Error logging usage: {str(e)}")
        return False

async def update_user_limits(user_id: str, limits: dict):
    try:
        response = supabase.table("user_limits").upsert({
            "user_id": user_id,
            **limits
        }).execute()
        return True
    except Exception as e:
        print(f"Error updating user limits: {str(e)}")
        return False

# Helper functions for subscriptions
def get_tier_from_stripe_product(product_id: str):
    try:
        product = stripe.Product.retrieve(product_id)
        return product.metadata.get("tier", "free")
    except Exception as e:
        print(f"Error getting tier from product: {str(e)}")
        return "free"

def get_user_id_from_stripe_customer(customer_id: str):
    try:
        # Query Supabase for the user_id associated with this customer
        response = supabase.table("stripe_customers").select("user_id").eq("customer_id", customer_id).execute()
        if response.data and len(response.data) > 0:
            return response.data[0].get("user_id")
        return None
    except Exception as e:
        print(f"Error getting user from customer: {str(e)}")
        return None

# Subscription event handlers
async def handle_subscription_created(event):
    subscription = event["data"]["object"]
    customer_id = subscription["customer"]
    items = subscription["items"]["data"]
    
    if items and len(items) > 0:
        price = items[0]["price"]
        product_id = price["product"]
        tier = get_tier_from_stripe_product(product_id)
        user_id = get_user_id_from_stripe_customer(customer_id)
        
        if user_id:
            limits = {
                "tier": tier,
                "monthly_quota": 10 if tier == "free" else 50 if tier == "basic" else 250,
                "max_file_size": 25000000 if tier == "free" else 50000000 if tier == "basic" else 100000000,
                "usage_reset_date": datetime.now().isoformat()
            }
            await update_user_limits(user_id, limits)

async def handle_subscription_updated(event):
    await handle_subscription_created(event)  # Same logic applies

async def handle_subscription_deleted(event):
    subscription = event["data"]["object"]
    customer_id = subscription["customer"]
    user_id = get_user_id_from_stripe_customer(customer_id)
    
    if user_id:
        limits = {
            "tier": "free",
            "monthly_quota": 10,
            "max_file_size": 25000000,
            "usage_reset_date": datetime.now().isoformat()
        }
        await update_user_limits(user_id, limits)

# API ROUTES
@app.get("/")
async def root():
    return {"message": "Audio Analysis API is running"}

@app.post("/webhook")
async def webhook(request: AudioRequest, user_id: str = Depends(get_current_user)):
    try:
        filename = request.filename
        # For now, assume file size is 5MB (you should get actual size)
        file_size = 5000000
        
        # Check user limits
        limits = await get_user_limits(user_id)
        current_usage = await get_current_usage(user_id)
        
        # Enforce quota limits
        if current_usage >= limits["monthly_quota"]:
            return JSONResponse(
                status_code=403,
                content={"message": "Monthly quota exceeded. Please upgrade your plan."}
            )
        
        # Log the usage
        await log_usage(user_id, "audio_analysis", file_size)
        
        # Your existing audio processing logic goes here
        # For now, just return a success message
        return {
            "message": "Processing started",
            "user_id": user_id,
            "usage": {
                "current": current_usage + 1,
                "limit": limits["monthly_quota"]
            }
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Error processing audio: {str(e)}"}
        )

@app.get("/user/usage")
async def get_usage(user_id: str = Depends(get_current_user)):
    try:
        limits = await get_user_limits(user_id)
        current_usage = await get_current_usage(user_id)
        
        return {
            "tier": limits["tier"],
            "usage": current_usage,
            "quota": limits["monthly_quota"],
            "reset_date": limits["usage_reset_date"]
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Error getting usage: {str(e)}"}
        )

@app.post("/stripe-webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, stripe_webhook_secret
        )
        
        # Handle subscription events
        event_type = event["type"]
        if event_type == "customer.subscription.created":
            await handle_subscription_created(event)
        elif event_type == "customer.subscription.updated":
            await handle_subscription_updated(event)
        elif event_type == "customer.subscription.deleted":
            await handle_subscription_deleted(event)
        
        return {"status": "success"}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": f"Webhook error: {str(e)}"}
        )

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    error_msg = str(exc)
    print(f"Error processing request: {error_msg}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "detail": error_msg}
    )

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
