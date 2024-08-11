import { AppRoutings } from 'utility/enums/app-routings.ts';
import { RouterType } from 'utility/enums/router-type.ts';
import Login from 'pages/Login/login';
export const AppRoutes = [
  {
    id: 1,
    path: AppRoutings.Root,
    element: Login,
    routeType: RouterType.unprotectedRoute
  }
];
