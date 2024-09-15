import React, { useContext, useState } from "react";
import { List, ListItem, ListItemText, Collapse, Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LayersIcon from "@mui/icons-material/Layers";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./Sidebar.css";
import CompanyLogo from "assets/images/UniqueIt.jpeg";
import { MenuContext } from "Context/MenuContext";
import { UserContext } from "Context/UserContext";
import { UserTypes } from "utility/enums/user-types.ts";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const Sidebar = () => {
    const menuDetails = useContext(MenuContext);
    const contextUser = useContext(UserContext);
    const location = useLocation();

    const [openLeadsMenu, setOpenLeadsMenu] = useState(false);
    const [openStageMenu, setOpenStageMenu] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const handleLeadsClick = () => {
        setOpenLeadsMenu(!openLeadsMenu);
    };
    const handleStageClick = () => {
        setOpenStageMenu(!openStageMenu);
    };
    const handleUserClick = () => {
        setOpenUserMenu(!openUserMenu);
    };

    const menuItems = [
        { pageid: 0, text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        {
            pageid: 0,
            text: "Team Management",
            icon: <PeopleIcon />,
            submenu: [
                { pageid: 0, text: "Team", path: "/users", icon: <PeopleIcon /> },
                {
                    pageid: 0,
                    text: "Add Team Member",
                    path: "/users/add-user",
                    icon: <PersonAddIcon />,
                },
            ],
            handleOpenFunc: handleUserClick,
            pageState: openUserMenu,
        },
        {
            pageid: 1,
            text: "Stage",
            icon: <LayersIcon />,
            submenu: [
                { pageid: 1, text: "Stage List", path: "/stage", icon: <LayersIcon /> },
                { pageid: 2, text: "Add Stage", path: "/stage/add", icon: <AddToPhotosIcon /> },
            ],
            handleOpenFunc: handleStageClick,
            pageState: openStageMenu,
        },
        {
            pageid: 3,
            text: "Lead Management",
            icon: <AttachMoneyIcon />,
            submenu: [
                { pageid: 3, text: "Lead List", path: "/leads", icon: <LayersIcon /> },
                { pageid: 4, text: "Create Lead", path: "/leads/add", icon: <AddCircleIcon /> },
                // { text: "Import Data", path: "/leads/import", icon: <ImportExportIcon /> },
            ],
            handleOpenFunc: handleLeadsClick,
            pageState: openLeadsMenu,
        },
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
                            contextUser.usertype !== UserTypes.User ||
                            item.pageid === 0 ||
                            item.submenu.some((submenuItem) =>
                                menuDetails.includes(submenuItem.pageid)
                            )
                    )
                    .map((item) => (
                        <React.Fragment key={item.text}>
                            <ListItem
                                button
                                component={Link}
                                to={item.submenu ? null : item.path} // if there's a submenu, don't make it a link
                                onClick={item.submenu ? item.handleOpenFunc : null}
                                className={location.pathname === item.path ? "active" : ""}
                            >
                                <div className="menu-icon">{item.icon}</div>
                                <ListItemText primary={item.text} className="sidebarmenutext" />
                                {item.submenu ? (
                                    item.pageState ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )
                                ) : null}
                            </ListItem>
                            {item.submenu && (
                                <Collapse in={item.pageState} timeout="auto" unmountOnExit>
                                    <List
                                        component="div"
                                        disablePadding
                                        className="sidebar-menu-list-custom"
                                    >
                                        {item.submenu
                                            .filter(
                                                (submenuItem) =>
                                                    contextUser.usertype !== UserTypes.User ||
                                                    submenuItem.pageid === 0 ||
                                                    menuDetails.includes(submenuItem.pageid)
                                            )
                                            .map((submenuItem) => (
                                                <ListItem
                                                    key={submenuItem.text}
                                                    button
                                                    component={Link}
                                                    to={submenuItem.path}
                                                    className={
                                                        location.pathname === submenuItem.path
                                                            ? "active submenu-item"
                                                            : " submenu-item"
                                                    }
                                                >
                                                    <div className="menu-icon">
                                                        {submenuItem.icon}
                                                    </div>
                                                    <ListItemText
                                                        className="sidebarmenutext"
                                                        primary={submenuItem.text}
                                                    />
                                                </ListItem>
                                            ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
            </List>
        </div>
    );
};

export default Sidebar;
