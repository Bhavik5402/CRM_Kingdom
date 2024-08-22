import { AppRoutings } from "utility/enums/app-routings.ts";
import { RouterType } from "utility/enums/router-type.ts";
import LoginPage from "pages/Login/LoginPage";
import UserPage from "pages/User/UserPage";
import Stage from "pages/Stage/Stage";
import AddUser from "pages/User/AddUser";
import LeadPage from 'pages/Lead/LeadPage';
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
        path: AppRoutings.Leads,
        element: LeadPage,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 6,
        path: AppRoutings.AddUser,
        element: AddUser,
        routeType: RouterType.protectedRoute,
    },
    {
        id: 7,
        path: AppRoutings.EditUser,
        element: AddUser,
        routeType: RouterType.protectedRoute,
    },
];
