import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import QuantitySelector from '../components/QuantitySelector';
import { ImageBackground } from 'react-native';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { fetchProductById } from '../api/Api';
import { addToCart } from '../action/CartSlice';



const { width } = Dimensions.get('window');
const Details = ({ route }) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Get the navigation object
    const { productId } = route.params;


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetchProductById(productId);

                setTimeout(() => {
                    setProduct(data);
                    setLoading(false);
                }, 200);
            } catch (error) {
                console.error("Fetch error:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const renderHeader = () => (
        <SafeAreaView style={style.header} forceInset={{ bottom: 'never' }}>
            <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
            <Icon name="shopping-cart" size={28} />
        </SafeAreaView>
    );

    const renderImageContainer = () => (

        <View style={style.imageContainer} >

            <Image
                source={{ uri: product.images[0] }}
                style={{ flex: 1, aspectRatio: 16 / 9, borderRadius: 8, resizeMode: 'contain' }}
            />


        </View >
    );

    const renderDetailsContainer = () => (
        <View style={style.detailsContainer}>
            <View
                style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                }}>

            </View>
            <View
                style={{
                    paddingHorizontal: 10,
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', width: '75%', }}>{product.title}</Text>
                <View style={style.priceTag}>

                    {product.priceSale ? (
                        <>
                            <Text
                                style={{

                                    color: COLORS.white,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                ${product.priceSale}
                            </Text>
                            <Text
                                style={{
                                    // marginLeft: 15,
                                    color: COLORS.white,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    textDecorationLine: 'line-through'
                                }}>
                                ${product.price}
                            </Text>
                        </>
                    ) : (
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            ${product.price}
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin</Text>
                <Text
                    style={{
                        color: 'grey',
                        fontSize: 16,
                        lineHeight: 22,
                        marginTop: 10,
                    }}>
                    {product.description}

                </Text>
                <TouchableOpacity onPress={handleAddToCart}>
                    <View style={style.buyBtn}>
                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                            Thêm vào giỏ hàng
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, 1, product.price); // Assuming you want to add one quantity each time
            Toast.show({
                type: 'success',
                text1: 'ADD TO CART SUCCESS',
                visibilityTime: 5000,
                autoHide: true,
            });

        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    if (loading) {
        return <Loading />
    }

    if (!product) {
        return <Loading />
    }
    return (
        <View style={style.container}>
            {renderHeader()}
            <ScrollView>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                    }}
                >
                    <View>

                        {renderImageContainer()}
                        {renderDetailsContainer()}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>


    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,

        backgroundColor: "rgba(237, 237, 237, 0.8)",
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 60, // Đảm bảo nội dung không bị che bởi header
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
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
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    buyBtn: {
        width: "100%",
        height: 50,
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 20
    },
    priceTag: {
        backgroundColor: COLORS.red,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
});

export default Details;