import api from "./api";

export const getSellerOrders =
    async () => {

    const response =
        await api.get(
            "/api/seller/orders"
        );

    return response.data;
};

export const updateOrderStatus =
    async (
        orderId,
        status
    ) => {

    return api.put(
        `/api/seller/orders/${orderId}/status`,
        {
            status
        }
    );
};