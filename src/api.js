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
export async function sendRequest(data, endpoint = '/webhook') {
  try {
    // Ensure proper URL construction by handling trailing slashes
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const apiEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${apiEndpoint}`;
    console.log(`Sending request to: ${url}`);
    
    // Format the payload according to the API's expected format
    // The API expects a payload with a "filename" field
    const payload = {
      filename: data.data?.fileUrl || '',
      ...data
    };
    
    console.log('Sending payload:', payload);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} filePath - The path to store the file at
 * @param {Function} progressCallback - Optional callback for upload progress
 * @returns {Promise<Object>} - The upload result
 */
export async function uploadFile(file, filePath, progressCallback = null) {
  if (!supabase) {
    console.error('Supabase not configured. File upload not possible.');
    return { error: { message: 'Supabase storage not configured' } };
  }
  
  try {
    // Create a bucket if it doesn't exist (only needed first time)
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .getBucket('audiorecordings');
      
    if (bucketError && bucketError.code === 'PGRST116') {
      // Bucket doesn't exist, create it
      const { error: createError } = await supabase
        .storage
        .createBucket('audiorecordings', {
          public: true,
          fileSizeLimit: 52428800 // 50MB in bytes
        });
        
      if (createError) {
        console.error('Error creating bucket:', createError);
        return { error: createError };
      }
    }
    
    // Upload the file
    const { data, error } = await supabase
      .storage
      .from('audiorecordings')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        onUploadProgress: progressCallback ? 
          (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            progressCallback(percent);
          } : undefined
      });
      
    if (error) {
      console.error('Error uploading file:', error);
      return { error };
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('audiorecordings')
      .getPublicUrl(filePath);
      
    return { data: { ...data, publicUrl } };
  } catch (err) {
    console.error('Exception uploading file:', err);
    return { error: err };
  }
}

/**
 * Create a new conversation record in Supabase
 * @param {Object} conversationData - The conversation data
 * @returns {Promise<Object>} - The Supabase response
 */
export async function createConversation(conversationData) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot create conversation.');
    return { error: { message: 'Supabase not configured' } };
  }
  
  try {
    const { data, error } = await supabase
      .from('repspheres_conversations')
      .insert([conversationData])
      .select();
      
    if (error) {
      console.error('Error creating conversation:', error);
      return { error };
    }
    
    return { data };
  } catch (err) {
    console.error('Exception creating conversation:', err);
    return { error: err };
  }
}

/**
 * Update a conversation's status
 * @param {string} conversationId - The conversation ID
 * @param {string} status - The new status
 * @param {string} errorMessage - Optional error message if status is 'error'
 * @returns {Promise<Object>} - The Supabase response
 */
export async function updateConversationStatus(conversationId, status, errorMessage = null) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot update conversation status.');
    return { error: { message: 'Supabase not configured' } };
  }
  
  try {
    const updateData = { status, updated_at: new Date().toISOString() };
    if (errorMessage) {
      updateData.error_message = errorMessage;
    }
    
    const { data, error } = await supabase
      .from('repspheres_conversations')
      .update(updateData)
      .eq('id', conversationId)
      .select();
      
    if (error) {
      console.error('Error updating conversation status:', error);
      return { error };
    }
    
    return { data };
  } catch (err) {
    console.error('Exception updating conversation status:', err);
    return { error: err };
  }
}

/**
 * Store behavioral analysis results
 * @param {Object} analysisData - The analysis data
 * @returns {Promise<Object>} - The Supabase response
 */
export async function storeBehavioralAnalysis(analysisData) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot store analysis.');
    return { error: { message: 'Supabase not configured' } };
  }
  
  try {
    const { data, error } = await supabase
      .from('repspheres_behavioral_analysis')
      .insert([analysisData])
      .select();
      
    if (error) {
      console.error('Error storing behavioral analysis:', error);
      return { error };
    }
    
    return { data };
  } catch (err) {
    console.error('Exception storing behavioral analysis:', err);
    return { error: err };
  }
}

/**
 * Store participant information
 * @param {Object} participantData - The participant data
 * @returns {Promise<Object>} - The Supabase response
 */
export async function storeParticipant(participantData) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot store participant.');
    return { error: { message: 'Supabase not configured' } };
  }
  
  try {
    const { data, error } = await supabase
      .from('repspheres_participants')
      .insert([participantData])
      .select();
      
    if (error) {
      console.error('Error storing participant:', error);
      return { error };
    }
    
    return { data };
  } catch (err) {
    console.error('Exception storing participant:', err);
    return { error: err };
  }
}

/**
 * Get a conversation with its analysis and participants
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<Object>} - The conversation data with analysis and participants
 */
export async function getConversationWithAnalysis(conversationId) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot get conversation.');
    return { error: { message: 'Supabase not configured' } };
  }
  
  try {
    // Get the conversation
    const { data: conversation, error: conversationError } = await supabase
      .from('repspheres_conversations')
      .select('*')
      .eq('id', conversationId)
      .single();
      
    if (conversationError) {
      console.error('Error getting conversation:', conversationError);
      return { error: conversationError };
    }
    
    // Get the behavioral analysis
    const { data: analysis, error: analysisError } = await supabase
      .from('repspheres_behavioral_analysis')
      .select('*')
      .eq('conversation_id', conversationId)
      .single();
      
    if (analysisError && analysisError.code !== 'PGRST116') { // Not found is ok
      console.error('Error getting behavioral analysis:', analysisError);
      return { error: analysisError };
    }
    
    // Get the participants
    const { data: participants, error: participantsError } = await supabase
      .from('repspheres_participants')
      .select('*')
      .eq('conversation_id', conversationId);
      
    if (participantsError) {
      console.error('Error getting participants:', participantsError);
      return { error: participantsError };
    }
    
    return { 
      data: { 
        conversation, 
        analysis: analysis || null, 
        participants: participants || [] 
      } 
    };
  } catch (err) {
    console.error('Exception getting conversation with analysis:', err);
    return { error: err };
  }
}

/**
 * Get all conversations for the current user
 * @param {number} limit - Optional limit on number of conversations to return
 * @param {number} offset - Optional offset for pagination
 * @returns {Promise<Object>} - The conversations
 */
export async function getUserConversations(limit = 10, offset = 0) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot get user conversations.');
    return { error: { message: 'Supabase not configured' } };
  }
  
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: { message: 'User not authenticated' } };
    }
    
    // Get the conversations
    const { data, error, count } = await supabase
      .from('repspheres_conversations')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
      
    if (error) {
      console.error('Error getting user conversations:', error);
      return { error };
    }
    
    return { data, count };
  } catch (err) {
    console.error('Exception getting user conversations:', err);
    return { error: err };
  }
}

export default {
  sendRequest,
  logActivity,
  checkAuthStatus,
  authenticate,
  register,
  uploadFile,
  createConversation,
  updateConversationStatus,
  storeBehavioralAnalysis,
  storeParticipant,
  getConversationWithAnalysis,
  getUserConversations,
  supabase
};
