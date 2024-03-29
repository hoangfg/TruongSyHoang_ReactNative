// CartItem.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchProductById } from '../../api/Api';
import QuantitySelector from '../../components/QuantitySelector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Details from './../ProductDetailScreen';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { getBook } from '../../api/ProductApi';
import CartImage from './CartImage';

const Item = ({ item, onDelete, onMinus, onPlus }) => {
    const [data, setData] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const fetchedProduct = await getBook(item.productId);
                setData(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [item.productId]);

    if (!data) {
        return <Loading />
    }

    return (
        <View
            key={item.productId}

            style={{
                width: '100%',
                height: 100,
                marginVertical: 6,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            {/* {renderImageContainer()} */}
            <CartImage items={data.images} />
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', { productId: item.productId })}>
                    <Text
                        style={{
                            fontSize: 14,
                            maxWidth: '100%',
                            // color: COLOURS.black,
                            fontWeight: '600',
                            letterSpacing: 1,
                        }}>
                        {data.name}
                    </Text>
                    <View
                        style={{
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            opacity: 0.6,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '85%',
                                marginRight: 4,
                            }}>
                            {data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Text>

                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={onMinus}
                            style={{
                                borderRadius: 100,
                                marginRight: 20,
                                padding: 4,
                                borderWidth: 1,
                                // borderColor: COLOURS.backgroundMedium,
                                opacity: 0.5,
                            }}>
                            <MaterialCommunityIcons
                                name="minus"
                                style={{
                                    fontSize: 16,
                                    // color: COLOURS.backgroundDark,
                                }}
                            />
                        </TouchableOpacity>
                        <Text>{item.quantity}</Text>
                        <TouchableOpacity onPress={onPlus}
                            style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                borderWidth: 1,
                                // borderColor: COLOURS.backgroundMedium,
                                opacity: 0.5,
                            }}>
                            <MaterialCommunityIcons
                                name="plus"
                                style={{
                                    fontSize: 16,
                                    // color: COLOURS.backgroundDark,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onDelete}>
                        <MaterialCommunityIcons
                            name="delete-outline"
                            style={{
                                fontSize: 16,
                                // color: COLOURS.backgroundDark,
                                // backgroundColor: COLOURS.backgroundLight,
                                padding: 8,
                                borderRadius: 100,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default Item;
