import React, { useContext } from "react";
import { List, ListItem, ListItemText, Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "./Sidebar.css";
import CompanyLogo from "assets/images/UniqueIt.jpeg";
import { MenuContext } from "Context/MenuContext";
import { UserContext } from "Context/UserContext";
import { UserTypes } from "utility/enums/user-types.ts";

const Sidebar = () => {
    // context variables
    const menuDetails = useContext(MenuContext);
    const contextUser = useContext(UserContext);

    const location = useLocation();

    const menuItems = [
        { pageid: 0, text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { pageid: 0, text: "Users", path: "/users", icon: <PeopleIcon /> },
        { pageid: 1, text: "Stage", path: "/stage", icon: <LayersIcon /> },
        { pageid: 3, text: "Leads", path: "/leads", icon: <AttachMoneyIcon /> },
    ];

    return (
        <div className="sidebar">
            <Box className="sidebar-header">
                <img src={CompanyLogo} alt="Company Logo" className="logo" />
                <Typography variant="h6" className="company-name">
                    CRM Kingdom
                </Typography>
            </Box>
            <hr className="divider"></hr>
            <List component="nav">
                {menuItems
                    .filter(
                        (item) =>
                            contextUser.usertype != UserTypes.User ||
                            item.pageid == 0 ||
                            menuDetails.includes(item.pageid)
                    )
                    .map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            component={Link}
                            to={item.path}
                            className={location.pathname === item.path ? "active" : ""}
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
