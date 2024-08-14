import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./app-routes";
import { RouterType } from "../enums/router-type.ts";
import { UnProtectedRoute } from "./unprotected-route.js";
import { ProtectedRoute } from "./protected-route.js";

export const RouterConfig = () => {
    return (
        <Routes>
            {AppRoutes.filter((route) => route.routeType === RouterType.unprotectedRoute).map(
                (item) => {
                    return (
                        <Route
                            key={item.id}
                            path={item.path}
                            element={<UnProtectedRoute element={<item.element />} />}
                        />
                    );
                }
            )}
            {AppRoutes.filter((route) => route.routeType === RouterType.protectedRoute).map(
                (item) => {
                    return (
                        <Route
                            key={item.id}
                            path={item.path}
                            element={<ProtectedRoute element={<item.element />} />}
                        />
                    );
                }
            )}
        </Routes>
    );
};
