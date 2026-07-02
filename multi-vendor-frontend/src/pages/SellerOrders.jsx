import { useEffect, useState } from "react";

import {
    getSellerOrders,
    updateOrderStatus
} from "../services/orderService";
import { showError, showSuccess } from "../utils/toast";
function SellerOrders() {

    const [orders, setOrders] =
        useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders =
        async () => {

        try {

            const data =
                await getSellerOrders();

            setOrders(data);

        } catch (error) {

            console.error(error);

            showError(
                "Failed to load orders"
            );
        }
    };

    const updateStatus =
        async (
            orderId,
            status
        ) => {

        try {

            await updateOrderStatus(
                orderId,
                status
            );

            showSuccess(
                "Status Updated"
            );

            loadOrders();

        } catch (error) {

            showError(
                error.response?.data ||
                "Failed"
            );
        }
    };

    const pending =
        orders.filter(
            o => o.status === "PENDING"
        ).length;

    const confirmed =
        orders.filter(
            o => o.status === "CONFIRMED"
        ).length;

    const shipped =
        orders.filter(
            o => o.status === "SHIPPED"
        ).length;

    const delivered =
        orders.filter(
            o => o.status === "DELIVERED"
        ).length;

    const cancelled =
        orders.filter(
            o => o.status === "CANCELLED"
        ).length;

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Seller Orders
            </h2>

            <div className="card mb-4">

                <div className="card-body">

                    <h4>
                        Total Orders:
                        {" "}
                        {orders.length}
                    </h4>

                    <p>
                        Pending:
                        {" "}
                        {pending}
                    </p>

                    <p>
                        Confirmed:
                        {" "}
                        {confirmed}
                    </p>

                    <p>
                        Shipped:
                        {" "}
                        {shipped}
                    </p>

                    <p>
                        Delivered:
                        {" "}
                        {delivered}
                    </p>

                    <p>
                        Cancelled:
                        {" "}
                        {cancelled}
                    </p>

                </div>

            </div>

            {orders.length === 0 ? (

                <h4>No Orders Found</h4>

            ) : (

                orders.map(order => {

                    let badgeClass =
                        "bg-danger";

                    if (
                        order.status ===
                        "PENDING"
                    ) {
                        badgeClass =
                            "bg-warning text-dark";
                    }

                    if (
                        order.status ===
                        "CONFIRMED"
                    ) {
                        badgeClass =
                            "bg-primary";
                    }

                    if (
                        order.status ===
                        "SHIPPED"
                    ) {
                        badgeClass =
                            "bg-info text-dark";
                    }

                    if (
                        order.status ===
                        "DELIVERED"
                    ) {
                        badgeClass =
                            "bg-success";
                    }

                    return (

                        <div
                            key={order.id}
                            className="card mb-3"
                        >

                            <div className="card-body">

                                <h5>
                                    Order #{order.id}
                                </h5>

                                <p>
                                    Customer:
                                    {" "}
                                    {order.customer?.email}
                                </p>

                                <p>

                                    Status:
                                    {" "}

                                    <span
                                        className={
                                            `badge ${badgeClass}`
                                        }
                                    >
                                        {order.status}
                                    </span>

                                </p>

                                <p>
                                    Total:
                                    {" "}
                                    ₹{order.totalAmount}
                                </p>

                                <hr />

                                {order.orderItems?.map(
                                    item => (

                                        <p
                                            key={
                                                item.id
                                            }
                                        >
                                            {
                                                item.product?.name
                                            }
                                            {" × "}
                                            {
                                                item.quantity
                                            }
                                        </p>

                                    )
                                )}

                                <div className="mt-3">

                                    {order.status ===
                                        "PENDING" && (
                                        <>
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "CONFIRMED"
                                                    )
                                                }
                                            >
                                                Confirm
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "CANCELLED"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {order.status ===
                                        "CONFIRMED" && (
                                        <>
                                            <button
                                                className="btn btn-warning me-2"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "SHIPPED"
                                                    )
                                                }
                                            >
                                                Ship
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "CANCELLED"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {order.status ===
                                        "SHIPPED" && (
                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "DELIVERED"
                                                )
                                            }
                                        >
                                            Deliver
                                        </button>
                                    )}

                                    {(order.status ===
                                        "DELIVERED" ||
                                        order.status ===
                                        "CANCELLED") && (
                                        <span className="badge bg-secondary">
                                            Completed
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>
                    );
                })

            )}

        </div>
    );
}

export default SellerOrders;