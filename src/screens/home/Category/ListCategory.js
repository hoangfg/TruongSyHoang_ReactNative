import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ListType from '../../../components/ListType';
import { useNavigation } from '@react-navigation/native';

const ListCategory = ({ data }) => {
    const navigation = useNavigation();

    const renderCategoryItem = ({ item }) => {
        console.log(item.name)
        return (
            <TouchableOpacity

                onPress={() => {
                    navigation.navigate('CategoryProducts', { categoryId: item.id });
                }}
            >
                <View >
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    // Split data into two rows


    return (
        <View style={styles.container}>
            <ListType title="Danh mục" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rowContainer}
            >
                {data.map((item) => (
                    <View key={item.id} style={styles.categoryItem}>
                        {renderCategoryItem({ item })}
                    </View>
                ))}
            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150,
        marginTop: 50,
    },
    rowContainer: {
        flexDirection: 'row',

    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        margin: 8,

    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 50
    },
    categoryTitle: {
        marginTop: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        height: '30%',
    },
});

export default ListCategory;
