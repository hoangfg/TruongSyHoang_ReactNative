import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid, Modal,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS, Items } from '../api/Database';
import { clearCart, getAll, removeFromCart, updateQuantity } from '../action/CartSlice';

import Item from './cart/item';


const CartUI = ({ navigation }) => {

    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = useState(false);
    const [deletedItem, setDeletedItem] = useState(null);
    const [checkoutConfirmationModalVisible, setCheckoutConfirmationModalVisible] = useState(false);
    const [checkoutItem, setCheckoutItem] = useState(null);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    const getDataFromDB = async () => {
        try {
            const allCartItems = await getAll();
            setProduct(allCartItems);
            calculateTotal(allCartItems);
        } catch (error) {
            console.error('Error getting cart data:', error);
        }
    };

    const calculateTotal = (productData) => {
        const calculatedTotal = productData.reduce((total, item) => {
            const price = item.price;
            const qty = item.quantity;
            const itemTotal = price * qty;
            return total + itemTotal;
        }, 0);

        setTotal(calculatedTotal);
    };
    const handleCheckout = () => {
        setCheckoutItem(true);
        setCheckoutConfirmationModalVisible(true);
    };

    const confirmCheckout = async () => {
        if (checkoutItem) {
            try {
                await clearCart(getDataFromDB);
                setCheckoutConfirmationModalVisible(false);
                setCheckoutItem(null);
            } catch (error) {
                console.error('Checkout failed:', error);
            }
        }
    };

    const cancelCheckout = () => {
        setCheckoutConfirmationModalVisible(false);
        setCheckoutItem(null);
    };


    const handleDeleteItem = (productId) => {
        setDeletedItem(productId);
        setDeleteConfirmationModalVisible(true);
    };

    const confirmDelete = async () => {
        if (deletedItem) {
            try {
                await removeFromCart(deletedItem, getDataFromDB);
                setDeleteConfirmationModalVisible(false);
                setDeletedItem(null);
            } catch (error) {
                console.error('Xoa thất bại:', error);
            }
        }
    };
    const cancelDelete = () => {
        setDeleteConfirmationModalVisible(false);
        setDeletedItem(null);
    };
    const handleMinusItem = async (productId) => {

        const selectedItem = product.find(item => item.productId === productId);

        if (selectedItem.quantity > 1) {
            const newQuantity = selectedItem.quantity - 1;
            setQuantity(newQuantity);
            await updateQuantity(productId, newQuantity, getDataFromDB);

        }
        if (selectedItem.quantity === 1) {
            console.log('Quantity is 1. Showing toast...');
            showToast({
                type: 'info',
                text: 'Số lượng không nhỏ hơn 1.'
            });
        }
    };
    const showToast = ({ type, text }) => {
        Toast.show({
            type: type,
            text1: text,
            visibilityTime: 5000,
            autoHide: false,
            position: 'bottom'
        });
    }
    const handlePlusItem = async (productId) => {

        const selectedItem = product.find(item => item.productId === productId);

        if (selectedItem) {
            const newQuantity = selectedItem.quantity + 1;
            setQuantity(newQuantity);
            await updateQuantity(productId, newQuantity, getDataFromDB);
        }
    };
    const renderProducts = (data, index) => {
        if (data) {
            return (
                <Item key={index.toString()} item={data} onDelete={handleDeleteItem} />
            );
        } else {
            // Handle the case where data is null or undefined
            return null;
        }
    };

    return (
        <View
            style={{
                width: '100%',
                height: '92%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>

            <ScrollView>
                <View
                    style={{
                        width: '100%',

                        flexDirection: 'row',
                        paddingTop: 16,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundDark,
                                padding: 12,
                                backgroundColor: COLOURS.backgroundLight,
                                borderRadius: 12,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                        }}>
                        Order Details
                    </Text>
                    <View></View>
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,
                        paddingTop: 20,
                        paddingLeft: 16,
                        marginBottom: 10,
                    }}>
                    My Cart
                </Text>
                <View style={{ paddingHorizontal: 16, height: "80%", }}>
                    {product
                        ? product.map((item, index) => (
                            <Item
                                key={item.productId.toString()}
                                item={item}
                                onDelete={() => handleDeleteItem(item.productId)}
                                onMinus={() => handleMinusItem(item.productId)}
                                onPlus={() => handlePlusItem(item.productId)}
                            />
                        ))
                        : null}
                </View>


            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: -55,
                    height: '8%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => (total !== 0 ? handleCheckout() : null)}
                    style={{
                        width: '86%',
                        height: '90%',
                        backgroundColor: COLOURS.blue,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '500',
                            letterSpacing: 1,
                            color: COLOURS.white,
                            textTransform: 'uppercase',
                        }}>
                        CHECKOUT (${total} )
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteConfirmationModalVisible}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: COLOURS.white,
                            padding: 20,
                            borderRadius: 10,
                            width: '80%',
                        }}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>
                            Confirm deletion
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable
                                style={{ padding: 10, borderRadius: 5, backgroundColor: COLOURS.red }}
                                onPress={confirmDelete}
                            >
                                <Text style={{ color: COLOURS.white }}>Có</Text>
                            </Pressable>
                            <Pressable
                                style={{ padding: 10, borderRadius: 5, backgroundColor: COLOURS.gray }}
                                onPress={cancelDelete}
                            >
                                <Text>Không</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={checkoutConfirmationModalVisible}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: COLOURS.white,
                            padding: 20,
                            borderRadius: 10,
                            width: '80%',
                        }}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>
                            Confirm Checkout
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            Bạn có muốn tiến hành mua những sản phẩm này?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable
                                style={{ padding: 10, borderRadius: 5, backgroundColor: COLOURS.green }}
                                onPress={confirmCheckout}
                            >
                                <Text style={{ color: COLOURS.white }}>Có</Text>
                            </Pressable>
                            <Pressable
                                style={{ padding: 10, borderRadius: 5, backgroundColor: COLOURS.gray }}
                                onPress={cancelCheckout}
                            >
                                <Text>Không</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CartUI;