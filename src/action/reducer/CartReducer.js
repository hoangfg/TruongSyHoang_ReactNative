// cartReducer.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, CLEAR_CART, GET_CART, REMOVE_FROM_CART } from './../CartAction';

const initialCartData = AsyncStorage.getItem('cart');
console.log("cart", AsyncStorage.getItem('cart'))
const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { productId, quantity } = action.payload;
            console.log(productId)
            const existingItemIndex = state.items.findIndex((i) => i.id === productId);

            if (existingItemIndex === -1) {
                state.items.push({ id: productId, count: quantity });
            } else {
                state.items[existingItemIndex].count += quantity;
            }
            AsyncStorage.setItem('cart', JSON.stringify(state.items));

            return {
                ...state,
                items: state.items,
            };
        case REMOVE_FROM_CART:
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            AsyncStorage.setItem('cart', JSON.stringify(filteredItems));
            return {
                ...state,
                items: filteredItems,
            };

        case CLEAR_CART:
            AsyncStorage.removeItem('cart');
            return {
                ...state,
                items: [],
            };
        case GET_CART:
            // Retrieve the cart data from AsyncStorage
            const cartData = AsyncStorage.getItem('cart');

            // Parse the JSON data, or provide a default empty array if data is null or undefined
            const parsedCartData = cartData ? JSON.parse(cartData) : [];

            return {
                ...state,
                items: parsedCartData,
            };
        default:
            return state;
    }
};

export default cartReducer;
