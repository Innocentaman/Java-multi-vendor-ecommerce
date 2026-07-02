import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../services/productService";
import { getProfile } from "../services/authService";
import { addToCart, getCart, updateCartItem, deleteCartItem } from "../services/cartService";
import { showError, showSuccess } from "../utils/toast";
function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [role, setRole] = useState(null);
    const [cartItemId, setCartItemId] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        loadPage();
    }, [id]);

    const loadPage = async () => {
        await loadProduct();
        await loadProfile();
        await loadCart();
    };

    const loadProduct = async () => {
        try {
            const data = await getProduct(id);
            setProduct(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            const response = await getProfile();
            setRole(response.data.role);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            const cart = await getCart();
            const existing = cart.find(item => item.product.id === Number(id));

            if (existing) {
                setCartItemId(existing.id);
                setQuantity(existing.quantity);
            } else {
                setCartItemId(null);
                setQuantity(0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const increaseQuantity = async () => {
        if (role !== "CUSTOMER") {
            showSuccess("Only customers can add products to cart.");
            return;
        }

        try {
            if (quantity === 0) {
                await addToCart(product.id, 1);
            } else {
                await updateCartItem(cartItemId, quantity + 1);
            }
            await loadCart();
        } catch (error) {
            showError(
                error.response?.data?.message ||
                error.response?.data ||
                "Something went wrong"
            );
        }
    };

    const decreaseQuantity = async () => {
        try {
            if (quantity <= 1) {
                await deleteCartItem(cartItemId);
            } else {
                await updateCartItem(cartItemId, quantity - 1);
            }
            await loadCart();
        } catch (error) {
            showError(
                error.response?.data?.message ||
                error.response?.data ||
                "Something went wrong"
            );
        }
    };

    if (!product) {
        return (
            <div className="container mt-4">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{
                                maxHeight: "350px",
                                width: "100%",
                                objectFit: "cover"
                            }}
                            onError={(e) => {
                                e.target.src = "https://placehold.co/500x350?text=No+Image";
                            }}
                        />
                    </div>

                    <div className="col-md-7">
                        <h2>{product.name}</h2>
                        <hr />
                        <p className="text-muted">{product.description}</p>
                        <h3 className="text-success">₹{product.price}</h3>
                        
                        <p>
                            <strong>Available Stock:</strong>{" "}
                            {product.stockQuantity > 0 ? (
                                product.stockQuantity
                            ) : (
                                <span className="text-danger">Out of Stock</span>
                            )}
                        </p>
                        <p>
                            <strong>Seller:</strong> {product.seller?.firstName} {product.seller?.lastName}
                        </p>
                        <p>
                            <strong>Category:</strong> {product.category?.name}
                        </p>

                        {role === "CUSTOMER" && (
                            <>
                                {product.stockQuantity === 0 ? (
                                    <button className="btn btn-danger me-2" disabled>
                                        Out of Stock
                                    </button>
                                ) : quantity === 0 ? (
                                    <button className="btn btn-success me-2" onClick={increaseQuantity}>
                                        Add To Cart
                                    </button>
                                ) : (
                                    <div className="d-flex align-items-center mb-3">
                                        <button className="btn btn-danger" onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <span className="mx-3 fw-bold fs-5">{quantity}</span>
                                        <button className="btn btn-success" onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button className="btn btn-secondary" onClick={() => navigate("/products")}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;