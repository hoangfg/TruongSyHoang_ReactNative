import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';



import ProductImage from '../../components/ProductImage';
import { getImage } from '../../api/ImageApi';
import { useNavigation } from '@react-navigation/native';



const CategoryImage = ({ items }) => {

    const navigation = useNavigation();

    return (

        <TouchableOpacity
            style={styles.productItem}
            onPress={() => {
                navigation.navigate('Details', { productId: items.id });
            }}
        >

            <ProductImage items={items.images} />

            <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode='tail'>{items.name}</Text>
            <View style={styles.priceBox}>
                <Text style={styles.productPrice}>{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            </View>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                    console.log(`Thêm vào giỏ hàng: ${items.name}`);
                    // Thực hiện hành động thêm vào giỏ hàng ở đây
                }}
            >
                <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({

    productItemWrapper: {
        width: '48%',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
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
        color: 'green',
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

export default CategoryImage;