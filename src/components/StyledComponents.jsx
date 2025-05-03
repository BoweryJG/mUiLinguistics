import React from 'react';
import { Box, useTheme, Avatar } from '@mui/material';

// Custom styled components
export const ScoreBadge = ({ score }) => {
  const theme = useTheme();
  let bgColor = theme.palette.info.light;
  let color = theme.palette.info.dark;

  if (score >= 90) {
    bgColor = theme.palette.success.light;
    color = theme.palette.success.dark;
  } else if (score < 80) {
    bgColor = theme.palette.warning.light;
    color = theme.palette.warning.dark;
  }

  return (
    <Box
      sx={{
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        fontWeight: 600,
        bgcolor: bgColor,
        color: color,
      }}
    >
      {score}
    </Box>
  );
};

export const IconWrapper = ({ color = 'primary', children }) => {
  const theme = useTheme();
  const colorMap = {
    primary: { bg: '#ede9fe', color: '#4f46e5' },
    secondary: { bg: '#f3e8ff', color: '#9333ea' },
    success: { bg: '#dcfce7', color: '#15803d' },
    warning: { bg: '#fef3c7', color: '#b45309' },
    info: { bg: '#dbeafe', color: '#1d4ed8' },
  };
  
  const style = colorMap[color] || colorMap.primary;
  
  return (
    <Box
      sx={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: style.bg,
        color: style.color,
        marginRight: '1rem',
      }}
    >
      {children}
    </Box>
  );
};

export const Badge = ({ variant = 'primary', children }) => {
  const theme = useTheme();
  const variantMap = {
    primary: { bg: '#ede9fe', color: '#4f46e5' },
    success: { bg: '#dcfce7', color: '#15803d' },
    warning: { bg: '#fef3c7', color: '#b45309' },
    info: { bg: '#dbeafe', color: '#1d4ed8' },
    error: { bg: '#fee2e2', color: '#b91c1c' },
  };
  
  const style = variantMap[variant] || variantMap.primary;
  
  return (
    <Box
      sx={{
        display: 'inline-block',
        px: 1,
        py: 0.5,
        fontSize: '0.75rem',
        fontWeight: 500,
        borderRadius: '0.25rem',
        bgcolor: style.bg,
        color: style.color,
      }}
    >
      {children}
    </Box>
  );
};

export const ProgressBar = ({ value, color = 'primary' }) => {
  const theme = useTheme();
  const getColor = () => {
    if (value >= 85) return theme.palette.success.main;
    if (value >= 75) return theme.palette.info.main;
    return theme.palette.warning.main;
  };
  
  return (
    <Box sx={{ width: '100%', height: '0.5rem', bgcolor: '#e2e8f0', borderRadius: '1rem', my: 0.5 }}>
      <Box 
        sx={{ 
          height: '100%', 
          borderRadius: '1rem', 
          width: `${value}%`,
          bgcolor: color === 'auto' ? getColor() : theme.palette[color].main,
        }} 
      />
    </Box>
  );
};
