import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import tokenManager from "./token-manager";
import { AppRoutings } from "utility/enums/app-routings.ts";

export const UnProtectedRoute = (props) => {
    // extract props
    const { element } = props;

    // get session token from cookies
    const sessionToken = tokenManager.getToken();

    return !sessionToken ? (element || <Outlet />) : (<Navigate to={AppRoutings.Dashboard} replace />);
};
