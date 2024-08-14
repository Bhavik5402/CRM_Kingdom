import { AppRoutings } from 'utility/enums/app-routings.ts';
import { RouterType } from 'utility/enums/router-type.ts';
import LoginPage from 'pages/Login/LoginPage';
import UserPage from 'pages/User/UserPage';
export const AppRoutes = [
  {
    id: 1,
    path: AppRoutings.Root,
    element: LoginPage,
    routeType: RouterType.unprotectedRoute
  },
  {
    id: 2,
    path: AppRoutings.Dashboard,
    element: UserPage,
    routeType: RouterType.unprotectedRoute
  },
];
