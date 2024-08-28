// src/components/ResetPasswordForm.js
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./ResetPasswordForm.css"; // Import custom CSS
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { useNavigate, useLocation } from "react-router-dom";
import { createCommonApiCall } from "utility/helper/create-api-call";
import authService from "services/auth-service";
import { AppRoutings } from "utility/enums/app-routings.ts";

const ResetPasswordForm = () => {
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const navigate = useNavigate();
    const search = useLocation().search;
    const resetToken = new URLSearchParams(search).get("token");
    const handleForgotPasswordClick = ()=>{
        navigate(AppRoutings.Root);
    }
    // Formik setup with initial values and validation schema
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            const data = await createCommonApiCall({
                requestBody: { token: resetToken, newPassword: values.password },
                apiService: authService.resetPassword,
                showErrorMessage: true,
                showSuccessMessage: true,
                setSuccessErrorContext,
            });
            if (data && data.isSuccessfull) {
                navigate(AppRoutings.Root, { replace: true });
            }
        },
    });

    return (
        <Box className="reset-password-form">
            <Box className="reset-password-header">
                <Typography variant="h5" className="reset-password-title">
                    Reset Password
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
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
                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    name="confirmPassword"
                    className="custom-text-field"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <Button type="submit" fullWidth variant="contained" className="reset-password-button">
                    RESET PASSWORD
                </Button>

                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Button onClick={handleForgotPasswordClick} className="forgot-password-button">
                        Back to login
                    </Button>
                </Box>

            </form>
        </Box>
    );
};

export default ResetPasswordForm;
