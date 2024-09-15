import { Navigate, Outlet } from "react-router-dom";
import tokenManager from "./token-manager";
import { AppRoutings } from "utility/enums/app-routings.ts";
import MainLayout from "Layout/MainLayout";

export const ProtectedRoute = (props) => {
    // extract props
    const { element } = props;

    // get session token from cookies
    const sessionToken = tokenManager.getToken();

    return sessionToken ? (
        <MainLayout>{element || <Outlet />}</MainLayout>
    ) : (
        <Navigate to={AppRoutings.Root + "?back=" + window.location.pathname} replace />
    );
};
