// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import CompanyLogo from 'assets/images/favicon.png';  // Assuming you have a logo image in the assets folder

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Users', path: '/users' }
  ];

  return (
    <div className="sidebar">
      <Box className="sidebar-header">
        <img src={CompanyLogo} alt="Company Logo" className="logo" />
        <Typography variant="h6" className="company-name">
          CRM Kingdom
        </Typography>
      </Box>
      <List component="nav">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
