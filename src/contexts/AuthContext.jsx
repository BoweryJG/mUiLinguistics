import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [usageData, setUsageData] = useState(null);
  
  // Check auth status on initial render
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { authenticated, user } = await api.checkAuthStatus();
        setIsAuthenticated(authenticated);
        setUser(user);
        
        if (authenticated && user) {
          // Fetch subscription data
          fetchUsageData();
        } else {
          // Set default values if not authenticated
          setSubscription({
            tier: 'free',
            quota: 10,
            usage: 0,
            resetDate: null
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Set default values on error
        setSubscription({
          tier: 'free',
          quota: 10,
          usage: 0,
          resetDate: null
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Fetch user's usage data
  const fetchUsageData = async () => {
    try {
      const data = await api.getUserUsage();
      setUsageData(data);
      setSubscription({
        tier: data.tier,
        quota: data.quota,
        usage: data.usage,
        resetDate: data.reset_date
      });
    } catch (error) {
      console.error('Failed to fetch usage data:', error);
      // Set default values if we can't fetch from the server
      setSubscription({
        tier: 'free',
        quota: 10,
        usage: 0,
        resetDate: null
      });
    }
  };
  
  const login = async (credentials) => {
    try {
      const { user } = await api.authenticate(credentials.password, null);
      setIsAuthenticated(true);
      setUser(user);
      fetchUsageData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const signup = async (userData) => {
    try {
      const { user } = await api.register(userData);
      setIsAuthenticated(true);
      setUser(user);
      fetchUsageData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const logout = async () => {
    try {
      if (api.supabase) {
        await api.supabase.auth.signOut();
      }
      setIsAuthenticated(false);
      setUser(null);
      setSubscription(null);
      setUsageData(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      subscription,
      usageData,
      fetchUsageData,
      login,
      signup,
      logout,
      getInitials: (name) => {
        return name
          ?.split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2) || 'JS';
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
