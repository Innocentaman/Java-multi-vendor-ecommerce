import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import api from "../services/api";

function SellerProducts() {

    const [products, setProducts] =
        useState([]);

    const navigate =
        useNavigate();

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            navigate("/login");

            return;
        }

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response =
                await api.get(
                    "/api/seller/products"
                );

            setProducts(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    const deleteProduct = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                "Delete this product?"
            );

        if (!confirmed) {

            return;
        }

        try {

            await api.delete(
                `/api/products/${id}`
            );

            showSuccess(
                "Product deleted successfully"
            );

            loadProducts();

        } catch (error) {

            showError(
                error.response?.data ||
                "Delete failed"
            );
        }
    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    My Products
                </h2>

                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate(
                            "/seller/products/create"
                        )
                    }
                >
                    Create Product
                </button>

            </div>

            {
                products.length === 0 ? (

                    <div className="card p-4">

                        <h4>
                            No Products Found
                        </h4>

                    </div>

                ) : (

                    products.map(product => (

                        <div
                            key={product.id}
                            className="card mb-4 shadow-sm"
                        >

                            <div className="row g-0 align-items-center">

                                <div className="col-md-3">

                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="img-fluid rounded-start"
                                        style={{
                                            height: "220px",
                                            width: "100%",
                                            objectFit: "cover"
                                        }}
                                        onError={(e) => {

                                            e.target.src =
                                                "https://placehold.co/300x220?text=No+Image";

                                        }}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <div className="card-body">

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <p className="text-muted">
                                            {product.description}
                                        </p>

                                        <h5 className="text-success">
                                            ₹{product.price}
                                        </h5>

                                        <p>
                                            <strong>
                                                Category:
                                            </strong>{" "}
                                            {
                                                product.category?.name
                                            }
                                        </p>

                                        <p>
                                            <strong>
                                                Stock:
                                            </strong>{" "}
                                            {
                                                product.stockQuantity
                                            }
                                        </p>

                                        <p>

                                            <strong>
                                                Availability:
                                            </strong>{" "}

                                            {

                                                product.stockQuantity > 0 ? (

                                                    <span className="text-success fw-bold">
                                                        In Stock
                                                    </span>

                                                ) : (

                                                    <span className="text-danger fw-bold">
                                                        Out of Stock
                                                    </span>

                                                )

                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="col-md-3 text-center">

                                    <div className="p-3">

                                        <button
                                            className="btn btn-primary w-100 mb-2"
                                            onClick={() =>
                                                navigate(
                                                    `/seller/products/edit/${product.id}`
                                                )
                                            }
                                        >
                                            Edit Product
                                        </button>

                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() =>
                                                deleteProduct(
                                                    product.id
                                                )
                                            }
                                        >
                                            Delete Product
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                )
            }

        </div>

    );
}

export default SellerProducts;