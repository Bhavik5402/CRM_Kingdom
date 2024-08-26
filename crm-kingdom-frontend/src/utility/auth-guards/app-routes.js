import { AppRoutings } from "utility/enums/app-routings.ts";
import { RouterType } from "utility/enums/router-type.ts";
import LoginPage from "pages/Login/LoginPage";
import UserPage from "pages/User/UserPage";
import Stage from "pages/Stage/Stage";
import AddUser from "pages/User/AddUser";
import LeadPage from "pages/Lead/LeadPage";
import AddStage from "pages/Stage/AddStage";
import EditStage from "pages/Stage/EditStage";
import AddLead from "pages/Lead/AddLead";
import ResetPasswordPage from "pages/ResetPassword/ResetPasswordPage";
import ForgotPasswordPage from "pages/ResetPassword/ForgotPasswordPage";

export const AppRoutes = [
    {
        id: 1,
        path: AppRoutings.Root,
        element: LoginPage,
        routeType: RouterType.unprotectedRoute,
    },
    {
        id: 2,
        path: AppRoutings.Dashboard,
        element: UserPage,
        routeType: RouterType.protectedRoute,
    },

    {
        id: 3,
        path: AppRoutings.User,
        element: UserPage,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 4,
        path: AppRoutings.Stage,
        element: Stage,
        routeType: RouterType.protectedRoute,
    },

    {
        id: 5,
        path: AppRoutings.AddStage,
        element: AddStage,
        routeType: RouterType.protectedRoute,
    },

    {
        id: 6,
        path: AppRoutings.EditStage,
        element: EditStage,
        routeType: RouterType.protectedRoute,
    },

    {
        id: 8,
        path: AppRoutings.Leads,
        element: LeadPage,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 9,
        path: AppRoutings.AddUser,
        element: AddUser,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 10,
        path: AppRoutings.EditUser,
        element: AddUser,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 11,
        path: AppRoutings.AddLead,
        element: AddLead,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 12,
        path: AppRoutings.ResetPassword,
        element: ResetPasswordPage,
        routeType: RouterType.unprotectedRoute,
    },
    {
        id: 13,
        path: AppRoutings.ForgotPassword,
        element: ForgotPasswordPage,
        routeType: RouterType.unprotectedRoute,
    },
];
