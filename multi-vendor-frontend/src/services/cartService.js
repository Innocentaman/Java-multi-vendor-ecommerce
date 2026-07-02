import api from "./api";

export const addToCart = async (
    productId,
    quantity = 1
) => {

    const response =
        await api.post(
            "/api/cart/items",
            {
                productId,
                quantity
            }
        );

    return response.data;
};

export const getCart = async () => {

    const response =
        await api.get(
            "/api/cart"
        );

    return response.data;
};

export const deleteCartItem = async (
    id
) => {

    const response =
        await api.delete(
            `/api/cart/items/${id}`
        );

    return response.data;
};

export const updateCartItem = async (
    id,
    quantity
) => {

    const response =
        await api.put(
            `/api/cart/items/${id}`,
            {
                quantity
            }
        );

    return response.data;
};

export const checkout = async () => {

    const response =
        await api.post(
            "/api/orders/checkout"
        );

    return response.data;
};