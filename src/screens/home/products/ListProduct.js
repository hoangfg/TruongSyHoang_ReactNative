import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListType from '../../../components/ListType';
import { ImageBackground } from 'react-native';
import { addToCart } from '../../../action/CartSlice';
import Toast from 'react-native-toast-message';

const ListProduct = ({ data }) => {
    const navigation = useNavigation();
    const navigateToProductList = () => {
        navigation.navigate('ProductList');
    };
    const handleAddToCart = async (productId, quantity, price) => {
        try {
            await addToCart(productId, quantity, price);
            Toast.show({
                type: 'success',
                text1: 'ADD TO CART SUCCESS',
                visibilityTime: 5000,
                autoHide: true,
            });

        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    const renderProductItem = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => {
                    navigation.navigate('Details', { productId: item.id });
                }}
            >
                {/* <Image source={item.image} style={styles.productImage} /> */}
                <ImageBackground
                    source={{ uri: item.images[0] }}
                    style={styles.productImage}
                >

                </ImageBackground>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.priceBox}>
                    {item.priceSale ? (
                        <>
                            <Text style={styles.productPriceSale}>${item.priceSale}</Text>
                            <Text style={styles.productPriceOriginal}>${item.price}</Text>
                        </>
                    ) : (
                        <Text style={styles.productPrice}>${item.price}</Text>
                    )}
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

    return (
        <View style={styles.container}>
            <ListType title="Sản phẩm mới" onPress={navigateToProductList} />
            <ScrollView
                horizontal
            // showsHorizontalScrollIndicator={false}
            // contentContainerStyle={styles.rowContainer}
            >
                {data?.map((item) => (
                    <View key={item.id} style={styles.productItemWrapper}>
                        {renderProductItem({ item })}
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
