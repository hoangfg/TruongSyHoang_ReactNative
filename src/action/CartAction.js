
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const GET_CART = 'GET_CART';

export const addToCart = (productId, quantity) => ({
    type: ADD_TO_CART,
    payload: {
        productId: productId,
        quantity: quantity,
    },
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: {
        id: productId,
    },
});

export const clearCart = () => ({
    type: CLEAR_CART,
});
export const getCart = () => ({
    type: GET_CART,
});