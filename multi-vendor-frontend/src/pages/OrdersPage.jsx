import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const response =
                await api.get(
                    "/api/orders/my-orders"
                );

            setOrders(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const cancelOrder = async (orderId) => {

        const confirmCancel =
            window.confirm(
                "Cancel this order?"
            );

        if (!confirmCancel) {
            return;
        }

        try {

            await api.put(
                `/api/orders/${orderId}/cancel`
            );

            showSuccess("Order cancelled");

            loadOrders();

        } catch (error) {

            showError(
                error.response?.data ||
                "Failed to cancel order"
            );
        }
    };

    return (

        <div className="container mt-4">

            <h2>My Orders</h2>

            {orders.length === 0 ? (

                <h4>No orders found</h4>

            ) : (

                orders.map(order => (

                    <div
                        key={order.id}
                        className="card mb-3"
                    >

                        <div className="card-body">

                            <h5>
                                Order #{order.id}
                            </h5>

                            <p>
                                Status:
                                {" "}
                                <strong>
                                    {order.status}
                                </strong>
                            </p>

                            <p>
                                Total:
                                {" "}
                                ₹{order.totalAmount}
                            </p>

                            <hr />

                            {order.orderItems?.map(item => (

                                <p key={item.id}>
                                    {item.product.name}
                                    {" × "}
                                    {item.quantity}
                                </p>

                            ))}

                            {(order.status === "PENDING" ||
                              order.status === "CONFIRMED") && (

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        cancelOrder(order.id)
                                    }
                                >
                                    Cancel Order
                                </button>

                            )}

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default OrdersPage;