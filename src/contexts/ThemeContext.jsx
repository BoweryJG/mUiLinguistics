import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('themePreference', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
