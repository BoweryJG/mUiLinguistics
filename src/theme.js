import { createTheme } from '@mui/material';

// Create light theme (original theme)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5',
      light: '#6366f1',
      dark: '#3730a3',
    },
    secondary: {
      main: '#9333ea',
      light: '#a855f7',
      dark: '#7e22ce',
    },
    success: {
      main: '#22c55e',
      light: '#dcfce7',
      dark: '#15803d',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
      dark: '#b45309',
    },
    error: {
      main: '#ef4444',
      light: '#fee2e2',
      dark: '#b91c1c',
    },
    info: {
      main: '#3b82f6',
      light: '#dbeafe',
      dark: '#1d4ed8',
    },
    grey: {
      100: '#f8fafc',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#334155',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '0.75rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#64748b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Create dark theme (RepSpheres deep space theme)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A2BE2', // Vibrant purple
      light: '#9370DB', // Medium purple
      dark: '#4B0082', // Indigo
    },
    secondary: {
      main: '#00FFFF', // Cyan neon
      light: '#7FFFD4', // Aquamarine
      dark: '#008B8B', // Dark cyan
    },
    background: {
      default: '#0F1123', // Deep space blue
      paper: '#1A1A2E', // Dark blue-purple
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0C4DE', // Light steel blue
    },
    // Additional space-themed colors
    error: {
      main: '#FF4500', // Orange-red (like a distant star)
    },
    warning: {
      main: '#FFD700', // Gold (like a pulsar)
    },
    info: {
      main: '#1E90FF', // Dodger blue (like a nebula)
    },
    success: {
      main: '#00FA9A', // Medium spring green (like aurora)
    },
    grey: {
      100: '#f8fafc',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '0.75rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 8px rgba(138, 43, 226, 0.6)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #1A1A2E 0%, #0F1123 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Export default theme as the light theme for backward compatibility
export default lightTheme;
