// src/pages/LoginPage.js
import React from "react";
import Background from "components/Login/Background";
import ForgotPasswordForm from "components/ResetPassword/ForgotPassword";

const ForgotPasswordPage = () => {
    return (
        <Background>
            <ForgotPasswordForm />
        </Background>
    );
};

export default ForgotPasswordPage;
