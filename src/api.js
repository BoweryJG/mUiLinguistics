import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Send a request to the backend API
 * @param {Object} data - The data to send to the API
 * @param {string} endpoint - The API endpoint (default: '/task')
 * @returns {Promise<Object>} - The API response
 */
export async function sendRequest(data, endpoint = '/task') {
  try {
    // Ensure proper URL construction by handling trailing slashes
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const apiEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${apiEndpoint}`;
    console.log(`Sending request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Log activity to Supabase
 * @param {Object} activity - The activity to log
 * @returns {Promise<Object|null>} - The Supabase response or null if Supabase is not configured
 */
export async function logActivity(activity) {
  if (!supabase) {
    console.warn('Supabase not configured. Activity logging skipped.');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('activity_log')
      .insert([activity]);
      
    if (error) {
      console.error('Error logging activity to Supabase:', error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error('Exception logging activity to Supabase:', err);
    return null;
  }
}

/**
 * Check user authentication status
 * @returns {Promise<Object>} - The authentication status
 */
export async function checkAuthStatus() {
  try {
    // Ensure proper URL construction
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const response = await fetch(`${baseUrl}/auth/status`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      return { authenticated: false };
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error checking authentication status:', err);
    return { authenticated: false };
  }
}

/**
 * Authenticate with password
 * @param {string} password - The password to authenticate with
 * @param {Object} userData - Optional user data for registration
 * @returns {Promise<Object>} - The authentication response
 */
export async function authenticate(password, userData = null) {
  try {
    // Ensure proper URL construction
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const response = await fetch(`${baseUrl}/auth/password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, userData }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Authentication failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Authentication error:', err);
    throw err;
  }
}

/**
 * Register a new user
 * @param {Object} userData - The user data for registration
 * @returns {Promise<Object>} - The registration response
 */
export async function register(userData) {
  try {
    // Ensure proper URL construction
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Registration failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Registration error:', err);
    throw err;
  }
}

export default {
  sendRequest,
  logActivity,
  checkAuthStatus,
  authenticate,
  register,
  supabase
};
