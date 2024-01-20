import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';

import { getImage } from './../../../api/ImageApi';
import Loading from '../../../components/Loading';

import { useNavigation } from '@react-navigation/native';
import ProductImage from './../../../components/ProductImage';
import { addToCart } from '../../../action/CartSlice';
const ProductItem = ({ item }) => {

    const navigation = useNavigation();

    const handleAddToCart = async (productId, quantity, price) => {
        try {
            await addToCart(productId, quantity, price);
            ToastAndroid.show("Thêm vào giỏ hàng thành công", ToastAndroid.BOTTOM)
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => {
                navigation.navigate('Details', { productId: item.id, category: item.publisher });
            }}
        >
            <ProductImage items={item.images} />

            <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode='tail'>
                {item.name}
            </Text>

            <View style={styles.priceBox}>
                <Text style={styles.productPrice}>
                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </Text>

            </View>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item.id, 1, item.price)}
            >
                <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 350,
        marginTop: 50,
        marginBottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    productItemWrapper: {
        marginRight: 10,
    },
    productItem: {
        width: 170,
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    productTitle: {
        marginTop: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
    },
    priceBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 5,
    },
    productPriceSale: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 5,
        textDecorationLine: 'line-through',
    },
    addToCartButton: {
        marginTop: 8,
        backgroundColor: 'blue',
        paddingVertical: 8,
        borderRadius: 8,
    },
    addToCartButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProductItem;