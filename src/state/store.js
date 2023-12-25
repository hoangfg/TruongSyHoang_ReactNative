// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../action/reducer/CartReducer';


const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;
