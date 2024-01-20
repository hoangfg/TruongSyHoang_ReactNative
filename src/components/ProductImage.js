import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { getImage } from '../api/ImageApi';
import Loading from './Loading';



const ProductImage = ({ items }) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            const imageUrl = await getImage('books', encodeURIComponent(items[0].name));

            setImageUrl(imageUrl);
            setLoading(false);
        };

        fetchImage();
    }, [items]);

    return (
        <>
            {loading ? <Loading /> : <Image source={{ uri: imageUrl }} style={styles.productImage} />}
        </>
    );
};

const styles = StyleSheet.create({

    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8,
    },

});

export default ProductImage;