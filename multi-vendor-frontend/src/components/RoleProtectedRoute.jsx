import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
    children,
    allowedRoles
}) {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        !allowedRoles.includes(role)
    ) {

        return (
            <Navigate
                to="/products"
                replace
            />
        );
    }

    return children;
}

export default RoleProtectedRoute;