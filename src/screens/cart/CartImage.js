import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import Loading from '../../components/Loading';
import { getImage } from '../../api/ImageApi';




const CartImage = ({ items }) => {

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
            {loading ? <Loading /> : (
                <View
                    style={{
                        width: '30%',
                        height: 100,
                        padding: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: COLOURS.backgroundLight,
                        borderRadius: 10,
                        marginRight: 22,
                    }}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            )}
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

export default CartImage;