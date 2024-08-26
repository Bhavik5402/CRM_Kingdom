// src/components/MainLayout.js
import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import tokenManager from "utility/auth-guards/token-manager";
import { WarningModal } from "components";
import { UserContext } from "Context/UserContext";

const MainLayout = ({ children }) => {
    // context variables
    const contextUser = useContext(UserContext);

    // state variables
    const [isLogoutWarningOpen, setIsLogoutWarningOpen] = useState(false);

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content">
                <div className="add-user-button">
                    <Typography variant="h6" sx={{ display: "inline", marginRight: "10px" }}>
                        Welcome, {contextUser.firstname} {contextUser.lastname}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setIsLogoutWarningOpen(true);
                        }}
                        color="primary"
                    >
                        <LogoutIcon sx={{ marginRight: "5px" }} />
                        Logout
                    </Button>
                </div>
                {children}
            </div>
            <WarningModal
                isModalOpen={isLogoutWarningOpen}
                handleOnClickCloseModal={() => setIsLogoutWarningOpen(false)}
                title="Confirmation"
                warningMessage="Are you sure you want to logout?"
                okButtonText="Logout"
                closeButtonText="Cancel"
                handleOnClickOk={() => {
                    tokenManager.clearSession();
                    setIsLogoutWarningOpen(false);
                }}
            />
        </div>
    );
};

export default MainLayout;
