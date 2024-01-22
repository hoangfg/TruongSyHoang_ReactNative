import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { getImage } from '../../../api/ImageApi';
import Loading from '../../../components/Loading';
import { useNavigation } from '@react-navigation/native';



const CategoryItem = ({ item }) => {
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            const imageUrl = await getImage('publishers', encodeURIComponent(item.image));

            setImageUrl(imageUrl);
            setLoading(false);
        };

        fetchImage();
    }, [item.image]);

    return (
        <TouchableOpacity

            onPress={() => {
                navigation.navigate('CategoryProducts', { categoryId: item.id, categoryName: item.name });
            }}
        >
            <View style={styles.categoryItem}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.categoryTitle}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    categoryItem: {
        flex: 1,
        alignItems: 'center',
        width: 100,
        height: 100,
        marginLeft: 10
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 50,
        justifyContent: "center"
    },
    categoryTitle: {
        marginTop: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        height: '30%',
    },

});

export default CategoryItem;