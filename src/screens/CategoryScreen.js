import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImageBackground } from 'react-native';
import { category, categorySinge, listProductWithCategory } from '../api/Api';
import { fetchProductById } from './../api/Api';
import ListType from '../components/ListType';
import Loading from '../components/Loading';
import { getPublisher, getPublishersBooks } from '../api/PublisherApi';
import CategoryItem from './home/Category/CategoryItem';
import CategoryImage from './category/CategoryImage';
import ProductItem from './home/products/ProductItem';


const CategoryProducts = ({ route }) => {
    const { categoryId, categoryName } = route.params;
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPublishersBooks(categoryId);
                setProducts(data.content);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchData();
    }, [categoryId]);

    if (loading) {
        return <Loading />
    }

    if (!products) {
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ListType title={categoryName} type="hiden" />
            <ScrollView
                contentContainerStyle={styles.container}
                horizontal={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.rowContainer}>
                    {!loading && products.length === 0 && (
                        <Text style={styles.noProductsText}>Không có sản phẩm</Text>
                    )}
                    {products.map((item) => (
                        <View key={item.id} style={styles.productItemWrapper}>
                          
                            <ProductItem item={item} />
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
