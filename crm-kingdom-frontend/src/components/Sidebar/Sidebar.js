import React from 'react';
import { List, ListItem, ListItemText, Box, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './Sidebar.css';
import CompanyLogo from 'assets/images/favicon.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Users', path: '/users', icon: <PeopleIcon /> },
    { text: 'Stage', path: '/stage', icon: <LayersIcon /> },
    { text: 'Leads', path: '/leads', icon: <AttachMoneyIcon /> },
  ];

  return (
    <div className="sidebar">
      <Box className="sidebar-header">
        <img src={CompanyLogo} alt="Company Logo" className="logo" />
        <Typography variant="h6" className="company-name">
          CRM Kingdom
        </Typography>
      </Box>
      <hr className='divider'></hr>
      <List component="nav">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <div className="menu-icon">{item.icon}</div>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
