// src/components/LoginForm.js
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./LoginForm.css"; // Import custom CSS
import authService from "services/auth-service";
import { createCommonApiCall } from "utility/helper/create-api-call";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import tokenManager from "utility/auth-guards/token-manager";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { UserDispatchContext } from "Context/UserContext";

const LoginForm = () => {
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const setUserContext = useContext(UserDispatchContext);
    const navigate = useNavigate();
    const search = useLocation().search;
    const backUrl = new URLSearchParams(search).get("back");

    // Formik setup with initial values and validation schema
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            const data = await createCommonApiCall({
                requestBody: values,
                apiService: authService.userLogin,
                showErrorMessage: true,
                showSuccessMessage: false,
                setSuccessErrorContext,
            });
            if (data && data.isSuccessfull) {
                tokenManager.setAuthorization(data.data.token, JSON.stringify(data.data.user));
                setUserContext(data.data.user);
                navigate(backUrl ? backUrl : AppRoutings.Dashboard, { replace: true });
            }
        },
    });

    return (
        <Box className="login-form">
            <Box className="login-header">
                <Typography variant="h5" className="login-title">
                    Sign in
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    variant="outlined"
                    name="email"
                    className="custom-text-field"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    className="custom-text-field"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button type="submit" fullWidth variant="contained" className="sign-in-button">
                    SIGN IN
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;
