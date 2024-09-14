import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0
    }}>
      <Toolbar>
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body1" color="inherit">
            © {new Date().getFullYear()} Unique IT Solutions. All Rights Reserved.
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
