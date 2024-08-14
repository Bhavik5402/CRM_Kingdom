// src/components/LoginForm.js
import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Divider,
    IconButton,
    FormControlLabel,
    Checkbox,
    Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import "./LoginForm.css"; // Import custom CSS

const LoginForm = () => {
    // state variables
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    // handle events
    const handleFormChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <Box className="login-form">
            <Box className="login-header">
                <Typography variant="h5" className="login-title">
                    Sign in
                </Typography>
            </Box>

            <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                variant="outlined"
                className="custom-text-field"
                value={formValues.email}
                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                className="custom-text-field"
                value={formValues.password}
                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
            />

            <Button fullWidth variant="contained" className="sign-in-button">
                SIGN IN
            </Button>
        </Box>
    );
};

export default LoginForm;
