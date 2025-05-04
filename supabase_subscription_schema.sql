-- Subscription and Usage Tracking Schema for RepSpheres
-- This script creates the necessary tables for subscription management and usage tracking
-- Run this in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Limits Table (Subscription Tiers)
CREATE TABLE IF NOT EXISTS user_limits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL DEFAULT 'free', -- 'free', 'basic', 'pro'
  monthly_quota INTEGER NOT NULL DEFAULT 10, -- Number of analyses allowed per month
  max_file_size INTEGER NOT NULL DEFAULT 25000000, -- Maximum file size in bytes (25MB for free tier)
  usage_reset_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Usage Table (Usage Tracking)
CREATE TABLE IF NOT EXISTS user_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL, -- 'audio_analysis', 'export', etc.
  file_size INTEGER, -- Size of the processed file in bytes
  conversation_id UUID REFERENCES repspheres_conversations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  request_successful BOOLEAN DEFAULT TRUE
);

-- Stripe Customer Mapping
CREATE TABLE IF NOT EXISTS stripe_customers (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id TEXT NOT NULL UNIQUE,
  subscription_id TEXT,
  subscription_status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON user_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_created_at ON user_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_customer_id ON stripe_customers(customer_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own limits
CREATE POLICY "Users can view their own limits"
  ON user_limits
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can view their own usage
CREATE POLICY "Users can view their own usage"
  ON user_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can view their own Stripe customer data
CREATE POLICY "Users can view their own Stripe customer data"
  ON stripe_customers
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create a function to automatically create user_limits entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_limits (user_id, tier, monthly_quota, max_file_size, usage_reset_date)
  VALUES (NEW.id, 'free', 10, 25000000, (NOW() + INTERVAL '30 days'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create a function to reset usage counters monthly
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS VOID AS $$
BEGIN
  -- Update the reset date for users whose reset date has passed
  UPDATE user_limits
  SET usage_reset_date = NOW() + INTERVAL '30 days',
      updated_at = NOW()
  WHERE usage_reset_date <= NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example of how to query usage data:
--
-- -- Get a user's current usage for the current period
-- SELECT COUNT(*) as current_usage
-- FROM user_usage
-- WHERE user_id = '00000000-0000-0000-0000-000000000000'
-- AND created_at >= (
--   SELECT usage_reset_date - INTERVAL '30 days'
--   FROM user_limits
--   WHERE user_id = '00000000-0000-0000-0000-000000000000'
-- );
--
-- -- Get users approaching their quota (80% or more used)
-- SELECT u.user_id, u.email, l.tier, l.monthly_quota, COUNT(us.*) as usage_count
-- FROM auth.users u
-- JOIN user_limits l ON u.id = l.user_id
-- JOIN user_usage us ON u.id = us.user_id
-- WHERE us.created_at >= (l.usage_reset_date - INTERVAL '30 days')
-- GROUP BY u.user_id, u.email, l.tier, l.monthly_quota
-- HAVING COUNT(us.*) >= (l.monthly_quota * 0.8);
