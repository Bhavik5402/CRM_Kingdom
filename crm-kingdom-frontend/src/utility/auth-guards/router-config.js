import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './app-routes';
import { RouterType } from '../enums/router-type.ts';

export const RouterConfig = () => {
  return (
    <Routes>
      {AppRoutes.filter((route) => route.routeType === RouterType.unprotectedRoute).map((item) => {
        return <Route key={item.id} path={item.path} element={<item.element />} />;
      })}
    </Routes>
  );
};
