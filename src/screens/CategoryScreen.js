import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImageBackground } from 'react-native';
import { category, categorySinge, listProductWithCategory } from '../api/Api';
import { fetchProductById } from './../api/Api';
import ListType from '../components/ListType';

const CategoryProducts = ({ route }) => {
    const { categoryId } = route.params;

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await listProductWithCategory(categoryId);

                setTimeout(() => {
                    setProducts(data);
                    setLoading(false);
                }, 200);
            } catch (error) {
                console.error("Fetch error:", error);
                setLoading(false);
            }
        };
        const fetchCategory = async () => {
            try {
                const data = await categorySinge(categoryId);
                console.log(data)
                setTimeout(() => {
                    setCategory(data);
                    setLoading(false);
                }, 200);
            } catch (error) {
                console.error("Fetch error:", error);
                setLoading(false);
            }
        }
        fetchProducts();
        fetchCategory();
    }, [categoryId]);

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
            <ListType title={category.name} type="hiden" />
            <ScrollView
                contentContainerStyle={styles.container}
                horizontal={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.rowContainer}>
                    {products.map((item) => (
                        <View key={item.id} style={styles.productItemWrapper}>

                            {renderProductItem({ item })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 30
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
    },
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

export default CategoryProducts;
