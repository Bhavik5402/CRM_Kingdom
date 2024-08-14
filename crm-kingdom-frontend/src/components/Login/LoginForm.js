// src/components/LoginForm.js
import React from "react";
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
    return (
        <Box className="login-form">
            <Box className="login-header">
                <Typography variant="h5" className="login-title">
                    Sign in
                </Typography>

                {/* <Box className="social-login-icons">
          <IconButton>
            <FacebookIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <GitHubIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <GoogleIcon style={{ color: 'white' }} />
          </IconButton>
        </Box> */}
            </Box>

            <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                variant="outlined"
                className="custom-text-field"
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                className="custom-text-field"
            />

            <FormControlLabel
                control={<Checkbox name="remember" color="primary" />}
                label="Remember me"
                className="remember-me-checkbox"
            />

            <Button fullWidth variant="contained" className="sign-in-button">
                SIGN IN
            </Button>
        </Box>
    );
};

export default LoginForm;
