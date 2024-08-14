// src/components/Background.js
import React from 'react';
import { Box } from '@mui/material';

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url("https://images.unsplash.com/photo-1722426365503-c406f62ed994?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default Background;
