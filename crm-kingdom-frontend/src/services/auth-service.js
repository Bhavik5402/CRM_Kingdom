import { UnProtectedEndPoints } from "./api-end-points.ts";
import httpClient from "./base-service";

const userLogin = (request) => httpClient.post(UnProtectedEndPoints.UserLogin, request);
const resetPassword = (request) => httpClient.post(UnProtectedEndPoints.UserResetPassword, request);
const forgotPassword = (request) => httpClient.post(UnProtectedEndPoints.UserForgotPassword, request);

export default {
    userLogin,
    resetPassword,
    forgotPassword
};
