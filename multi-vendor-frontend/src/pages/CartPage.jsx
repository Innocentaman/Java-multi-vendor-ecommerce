import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getCart,
  deleteCartItem,
  updateCartItem,
  checkout,
} from "../services/cartService";
import { showError, showSuccess } from "../utils/toast";
function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [paymentError, setPaymentError] = useState("");

  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);
  const [showPayment, setShowPayment] = useState(false);
  const [paying, setPaying] = useState(false);

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const handleCardChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };
  const validateCard = () => {
    setPaymentError("");

    const { name, number, expiry, cvv } = card;

    // Name check
    if (!name.trim()) {
        setPaymentError("Card holder name is required");
        return false;
    }

    // Card number check (16 digits)
    if (!/^\d{16}$/.test(number)) {
        setPaymentError("Card number must be 16 digits");
        return false;
    }

    // CVV check (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
        setPaymentError("CVV must be 3 digits");
        return false;
    }

    // Expiry check (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setPaymentError("Expiry must be in MM/YY format");
        return false;
    }

    const [mm, yy] = expiry.split("/").map(Number);

    if (mm < 1 || mm > 12) {
        setPaymentError("Invalid expiry month");
        return false;
    }

    // check expiry date not in past
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
        setPaymentError("Card is expired");
        return false;
    }

    return true;
};
  const loadCart = async () => {
    try {
      const data = await getCart();

      setCartItems(data);

      let grandTotal = 0;

      data.forEach((item) => {
        grandTotal += item.product.price * item.quantity;
      });

      setTotal(grandTotal);
    } catch (error) {
      console.error(error);

      navigate("/login");
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartItem(id);

      loadCart();
    } catch (error) {
      showError(error.response?.data || "Something went wrong");
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);

      return;
    }

    try {
      await updateCartItem(id, quantity);

      loadCart();
    } catch (error) {
      showError(error.response?.data || "Something went wrong");
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();

      showSuccess("Order placed successfully.");

      loadCart();
    } catch (error) {
      showError(error.response?.data || "Checkout failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <h4>Your cart is empty</h4>
      ) : (
        <>
          {cartItems.map((item) => {
            const subtotal = item.product.price * item.quantity;

            const outOfStock = item.product.stockQuantity === 0;

            const maxReached = item.quantity >= item.product.stockQuantity;

            return (
              <div key={item.id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="img-fluid rounded-start"
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/300x180?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <div className="card-body">
                      <h4>{item.product.name}</h4>

                      <p className="text-muted">{item.product.description}</p>

                      <h5 className="text-success">₹{item.product.price}</h5>

                      <p className="mb-1">
                        <strong>Available Stock:</strong>{" "}
                        {outOfStock ? (
                          <span className="text-danger">Out of Stock</span>
                        ) : (
                          item.product.stockQuantity
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-3 text-center">
                    <div className="p-3">
                      <div className="mb-3">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>

                        <span className="mx-3 fs-5">{item.quantity}</span>

                        <button
                          className="btn btn-outline-success"
                          disabled={outOfStock || maxReached}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {outOfStock && (
                        <p className="text-danger fw-bold">
                          Product is currently unavailable
                        </p>
                      )}

                      <p>
                        <strong>Subtotal</strong>
                      </p>

                      <h5>₹{subtotal}</h5>

                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="card shadow mt-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Total: ₹{total}</h3>

              <button
                className="btn btn-success btn-lg"
                onClick={() => setShowPayment(true)}
              >
                Pay & Checkout
              </button>
            </div>
          </div>
          {showPayment && (
            <div className="card shadow mt-4">
              <div className="card-body">
                <h4 className="mb-3">Payment Details</h4>
                {paymentError && (
    <div className="alert alert-danger">
        {paymentError}
    </div>
)}
                <input
                  className="form-control mb-2"
                  name="name"
                  placeholder="Card Holder Name"
                  value={card.name}
                  onChange={handleCardChange}
                />

                <input
                  className="form-control mb-2"
                  name="number"
                  placeholder="Card Number"
                  maxLength={16}
                  value={card.number}
                  onChange={handleCardChange}
                />

                <div className="d-flex gap-2">
                  <input
                    className="form-control"
                    name="expiry"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={handleCardChange}
                  />

                  <input
                    className="form-control"
                    name="cvv"
                    placeholder="CVV"
                    maxLength={3}
                    value={card.cvv}
                    onChange={handleCardChange}
                  />
                </div>

                <button
                  className="btn btn-primary mt-3 w-100"
                  disabled={paying}
                  onClick={async () => {

    if (!validateCard()) return;

    setPaying(true);

    setTimeout(async () => {
        try {
            await checkout();

            showSuccess("Payment successful & order placed!");

            setShowPayment(false);
            setCard({
                name: "",
                number: "",
                expiry: "",
                cvv: ""
            });

            loadCart();

        } catch (error) {
            showError("Payment failed");
        } finally {
            setPaying(false);
        }
    }, 2000);

}}
                >
                  {paying ? "Processing Payment..." : "Pay Now"}
                </button>

                <button
                  className="btn btn-link mt-2"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
