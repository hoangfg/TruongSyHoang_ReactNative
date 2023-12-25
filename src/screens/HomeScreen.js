import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ListBanner from './home/Banner/Banner';
import ListCategory from './home/Category/ListCategory';
import ListProduct from './home/products/ListProduct';



const HomeScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Đặt giá trị false để ẩn header
        });
    }, [navigation]);
    const bannerData = [
        { id: 1, image: require('../assets/b1.jpg') },
        { id: 2, image: require('../assets/b1.jpg') },
        { id: 3, image: require('../assets/b1.jpg') },

    ];
    const categories = [
        { id: 1, title: "Category", image: require('../assets/sport-shoe-icon_602006-1465.webp') },
        { id: 2, title: "Category", image: require('../assets/R.jpg') },
        { id: 3, title: "Category", image: require('../assets/R.png') },
        { id: 4, title: "Category", image: require('../assets/OIP.jpg') },

    ];
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <ScrollView >
            <ListBanner data={bannerData} />
            <ListCategory data={categories} />
            <ListProduct data={products} />

        </ScrollView>
    )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


});
