import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImageBackground } from 'react-native';
import { category, categorySinge, listProductWithCategory } from '../api/Api';
import { fetchProductById } from './../api/Api';
import ListType from '../components/ListType';

const ProductList = ({ route }) => {


    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const { search } = route.params || { search: '' };
    const [title, setTitle] = useState("Tất cả sản phẩm");


    useEffect(() => {
        if (search) {
            setTitle(`Kết quả tìm kiếm cho "${search}"`);
        } else {
            setTitle("Tất cả sản phẩm");
        }
    }, [search]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    // const getProducts = async (newOffset) => {
    //     try {
    //         const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${newOffset}&limit=${limit}`);
    //         const data = await response.json();
    //         setProducts((prevProducts) => [...prevProducts, ...data]);
    //         setOffset(newOffset);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search) {
                    const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${search}`);
                    const data = await response.json();
                    setProducts(data);
                } else {
                    const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
                    const data = await response.json();
                    setProducts((prevProducts) => [...prevProducts, ...data]);
                    setOffset(offset + limit);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [search]);

    const loadMore = () => {
        const newOffset = offset + limit;
        getProducts(newOffset);
    };

    const renderProductItem = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => {
                    navigation.navigate('Details', { productId: item.id });
                }}
            >

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
            <ListType title={`${title}`} type="hiden" />
            <ScrollView
                contentContainerStyle={styles.container}
                horizontal={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.rowContainer}>
                    {products.map((item, index) => (
                        <View key={`${item.id}-${item.name}`} style={styles.productItemWrapper}>
                            {renderProductItem({ item })}
                        </View>
                    ))}
                </View>
                {search === '' && (
                    <TouchableHighlight onPress={loadMore} style={styles.loadMoreButton}>
                        <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableHighlight>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 50
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
    loadMoreButton: {
        backgroundColor: 'gray',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    loadMoreButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProductList;
