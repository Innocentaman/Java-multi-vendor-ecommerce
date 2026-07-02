import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import { getProfile } from "../services/authService";

function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadUser();

    }, [location.pathname]);

    const loadUser = async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            setUser(null);
            return;
        }

        try {

            const response =
                await getProfile();

            setUser(response.data);

        } catch {

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            setUser(null);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setUser(null);

        navigate("/login");
    };

    // Hide navbar on auth pages

    if (
        location.pathname === "/login" ||
        location.pathname === "/register"
    ) {
        return null;
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/products"
                >
                    Multi Vendor Ecommerce
                </Link>

                <div className="ms-auto d-flex align-items-center">

                    <Link
                        className="btn btn-primary me-2"
                        to="/products"
                    >
                        Products
                    </Link>

                    {user?.role === "CUSTOMER" && (
                        <>
                            <Link
                                className="btn btn-success me-2"
                                to="/cart"
                            >
                                Cart
                            </Link>

                            <Link
                                className="btn btn-info me-2"
                                to="/orders"
                            >
                                Orders
                            </Link>
                        </>
                    )}

                    {user?.role === "SELLER" && (
                        <>
                            <Link
                                className="btn btn-success me-2"
                                to="/seller/products"
                            >
                                My Products
                            </Link>

                            <Link
                                className="btn btn-warning me-2"
                                to="/seller/orders"
                            >
                                Seller Orders
                            </Link>
                        </>
                    )}

                    {user?.role === "ADMIN" && (
                        <>
                            <Link
                                className="btn btn-warning me-2"
                                to="/admin/dashboard"
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="btn btn-success me-2"
                                to="/admin/categories"
                            >
                                Categories
                            </Link>
                        </>
                    )}

                    {user ? (
                        <>
                            <span className="text-white me-3">

                                {user.email}

                                <span
                                    className="badge bg-secondary ms-2"
                                >
                                    {user.role}
                                </span>

                            </span>

                            <button
                                className="btn btn-danger"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            className="btn btn-success"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;