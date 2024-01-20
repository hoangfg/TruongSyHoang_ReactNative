import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { getImage } from '../../api/ImageApi';
import Loading from '../../components/Loading';



const DetailImage = ({ items }) => {
    console.log(items)
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
                <View style={style.imageContainer} >

                    <Image
                        source={{ uri: imageUrl }}
                        style={{ flex: 1, aspectRatio: 16 / 9, borderRadius: 8, resizeMode: 'contain' }}
                    />


                </View >
            )}
        </>
    );
};

const style = StyleSheet.create({

    imageContainer: {
        flex: 1,
        marginTop: 50,
    },
    productImage: {
        width: '100%',
        height: "auto",
        borderRadius: 8,
        resizeMode: 'contain',

    },

});

export default DetailImage;