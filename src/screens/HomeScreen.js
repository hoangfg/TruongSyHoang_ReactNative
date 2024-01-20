import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ListBanner from './home/Banner/Banner';
import ListCategory from './home/Category/ListCategory';
import ListProduct from './home/products/ListProduct';
import { listCategory } from '../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBooks, product } from '../api/ProductApi';
import { getPublishers } from '../api/PublisherApi';



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

    const [categories, setCategories] = useState([]);



    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBooks();
                setBooks(data.content);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        const getCategories = async () => {
            try {
                const data = await getPublishers();
                setCategories(data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getCategories();
        fetchData();
    }, []);

    return (
        <ScrollView >
            <ListBanner data={bannerData} />
            <ListCategory data={categories} />
            <ListProduct data={books} />

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
