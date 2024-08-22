// src/components/MainLayout.js
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import tokenManager from "utility/auth-guards/token-manager";

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content">
                <div className="add-user-button">
                    <Button
                        variant="contained"
                        onClick={() => {
                            tokenManager.clearSession();
                        }}
                        color="primary"
                    >
                        <LogoutIcon sx={{ marginRight: "5px" }} />
                        Logout
                    </Button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
