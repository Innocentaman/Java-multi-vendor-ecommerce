import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";

import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

import SellerProducts from "./pages/SellerProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import SellerOrders from "./pages/SellerOrders";

import AdminDashboard from "./pages/AdminDashboard";
import CategoriesPage from "./pages/CategoriesPage";

import RoleProtectedRoute from "./components/RoleProtectedRoute";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Default */}

        <Route
          path="/"
          element={<Navigate to="/products" />}
        />

        {/* Auth */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Public */}

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* CUSTOMER ROUTES */}

        <Route
          path="/cart"
          element={
            <RoleProtectedRoute
              allowedRoles={["CUSTOMER"]}
            >
              <CartPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <RoleProtectedRoute
              allowedRoles={["CUSTOMER"]}
            >
              <OrdersPage />
            </RoleProtectedRoute>
          }
        />

        {/* SELLER ROUTES */}

        <Route
          path="/seller/products"
          element={
            <RoleProtectedRoute
              allowedRoles={["SELLER"]}
            >
              <SellerProducts />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/products/create"
          element={
            <RoleProtectedRoute
              allowedRoles={["SELLER"]}
            >
              <CreateProduct />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/products/edit/:id"
          element={
            <RoleProtectedRoute
              allowedRoles={["SELLER"]}
            >
              <EditProduct />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <RoleProtectedRoute
              allowedRoles={["SELLER"]}
            >
              <SellerOrders />
            </RoleProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <RoleProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <CategoriesPage />
            </RoleProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div className="container mt-5">
              <h2>Page Not Found</h2>
            </div>
          }
        />

      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>

  );
}

export default App;