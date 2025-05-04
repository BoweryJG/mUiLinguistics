import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check auth status on initial render
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { authenticated, user } = await api.checkAuthStatus();
        setIsAuthenticated(authenticated);
        setUser(user);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (credentials) => {
    try {
      const { user } = await api.authenticate(credentials.password, null);
      setIsAuthenticated(true);
      setUser(user);
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
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const logout = async () => {
    try {
      // Assuming there's a logout endpoint in the API
      // If not, we can just clear the local state
      setIsAuthenticated(false);
      setUser(null);
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
