import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListType from '../../../components/ListType';
import { ImageBackground } from 'react-native';

const ListProduct = ({ data }) => {
    const navigation = useNavigation();

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
                    source={{ uri: item.image }}
                    style={styles.productImage}
                >

                </ImageBackground>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.priceBox}>
                    {item.priceSale ? (
                        <>
                            <Text style={styles.productPriceSale}>{item.priceSale} USD</Text>
                            <Text style={styles.productPriceOriginal}>{item.price} USD</Text>
                        </>
                    ) : (
                        <Text style={styles.productPrice}>{item.price} USD</Text>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                        console.log(`Thêm vào giỏ hàng: ${item.title}`);
                        // Thực hiện hành động thêm vào giỏ hàng ở đây
                    }}
                >
                    <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ListType title="Featured Product" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rowContainer}
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

export default ListProduct;
