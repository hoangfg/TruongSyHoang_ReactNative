import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImageBackground } from 'react-native';
import { category, categorySinge, listProductWithCategory } from '../api/Api';
import { fetchProductById } from './../api/Api';
import ListType from '../components/ListType';
import { addToCart } from '../action/CartSlice';
import Toast from 'react-native-toast-message';
import Loading from '../components/Loading';
import ProductItem from './home/products/ProductItem';
import { getBooks, getBooksBySearch } from '../api/ProductApi';

const ProductList = ({ route }) => {


    const [books, setBooks] = useState([]);
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBooks();
                setBooks(data.content);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        const fetchDataSearch = async () => {
            try {
                const data = await getBooksBySearch(search);
                setBooks(data.content);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }

        if (search) {
            fetchDataSearch()
        } else {
            fetchData();
        }
    }, [search]);




    if (loading) {
        return <Loading />
    }

    if (!books) {
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ListType title={`${title}`} type="hiden" />
            <ScrollView
                contentContainerStyle={styles.container}
                horizontal={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.rowContainer}>
                    {!loading && books.length === 0 && (
                        <Text style={styles.noProductsText}>Không có sản phẩm</Text>
                    )}
                    {books.map((item) => (
                        <ProductItem key={item.id} item={item} />
                    ))}
                </View>

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
