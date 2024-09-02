// src/components/ForgotPasswordForm.js
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./ForgotPassword.css"; // Import custom CSS
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { createCommonApiCall } from "utility/helper/create-api-call";
import authService from "services/auth-service";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";

const ForgotPasswordForm = () => {
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const navigate = useNavigate();

    const handleForgotPasswordClick = ()=>{
        navigate(AppRoutings.Root);
    }

    // Formik setup with initial values and validation schema
    const formik = useFormik({
        initialValues: {
            username: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username or Email is required"),
        }),
        onSubmit: async (values) => {
            const data = await createCommonApiCall({
                requestBody: { email: values.username },
                apiService: authService.forgotPassword,
                setSuccessErrorContext,
                showPopup: true
            });
            if (data && data.isSuccessfull) {
                navigate(AppRoutings.Root);
            }
        },
    });

    return (
        <Box className="forgot-password-form">
            <Box className="forgot-password-header">
                <Typography variant="h5" className="forgot-password-title">
                    Forgot Password
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username or Email"
                    type="text"
                    variant="outlined"
                    name="username"
                    className="custom-text-field"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="forgot-password-button"
                >
                    SEND RESET LINK
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

export default ForgotPasswordForm;
