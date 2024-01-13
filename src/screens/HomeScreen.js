import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ListBanner from './home/Banner/Banner';
import ListCategory from './home/Category/ListCategory';
import ListProduct from './home/products/ListProduct';
import { listCategory } from '../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const getProducts = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();

            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getCategories = async () => {
        try {
            const data = await listCategory();

            setCategories(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getProducts();
        getCategories();
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
