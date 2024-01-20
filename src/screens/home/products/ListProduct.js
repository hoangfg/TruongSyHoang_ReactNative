import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListType from '../../../components/ListType';
import { ImageBackground } from 'react-native';
import { addToCart } from '../../../action/CartSlice';
import Toast from 'react-native-toast-message';
import { getImage } from '../../../api/ImageApi';
import ProductItem from './ProductItem';

const ListProduct = ({ data, categoryName }) => {

    const navigation = useNavigation();
    const navigateToProductList = () => {
        navigation.navigate('ProductList');
    };
    const [title, setTitle] = useState("Sản phẩm mới");


    useEffect(() => {


        if (categoryName) {
            setTitle(`${categoryName}`);
        }
    }, [categoryName]);
    return (
        <View style={styles.container}>
            <ListType title={title} onPress={navigateToProductList} />
            <ScrollView horizontal>
                {data?.map((item) => (
                    <View key={item.id} style={styles.productItemWrapper}>
                        <ProductItem item={item} />
                    </View>
                ))}
            </ScrollView>
        </View>
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

export default ListProduct;
