import AsyncStorage from '@react-native-async-storage/async-storage';

const addToCart = async (productId, quantity, price) => {
    try {
        const existingCart = await AsyncStorage.getItem('carts');
        let cart = existingCart ? JSON.parse(existingCart) : [];
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        // console.log(existingItemIndex)
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ productId, quantity, price });
        }
        await AsyncStorage.setItem('carts', JSON.stringify(cart));
        // console.log('Item added to cart:', { productId, quantity, price });
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};
const updateQuantity = async (productId, newQuantity, callback) => {
    try {
        const existingCart = await AsyncStorage.getItem('carts');
        let cart = existingCart ? JSON.parse(existingCart) : [];
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity = newQuantity;
            await AsyncStorage.setItem('carts', JSON.stringify(cart));
            if (callback) {
                callback();
            }
        } else {
            console.warn('Product not found in the cart:', productId);
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};

const removeFromCart = async (productId, callback) => {
    try {
        const existingCart = await AsyncStorage.getItem('carts');
        const cart = existingCart ? JSON.parse(existingCart) : [];

        const updatedCart = cart.filter(item => item.productId !== productId);

        await AsyncStorage.setItem('carts', JSON.stringify(updatedCart));

        console.log('Item removed from cart:', productId);

        // Call the callback function to trigger a re-render
        if (callback) {
            callback();
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};


const clearCart = async (callback) => {
    try {
        await AsyncStorage.removeItem('carts');
        if (callback) {
            callback();
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
};

const getAll = async () => {
    try {
        const cartData = await AsyncStorage.getItem('carts');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error getting cart data:', error);
        return [];
    }
};
export { addToCart, removeFromCart, clearCart, getAll, updateQuantity };