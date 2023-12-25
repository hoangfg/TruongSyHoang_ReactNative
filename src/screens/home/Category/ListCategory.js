import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import ListType from '../../../components/ListType';

const ListCategory = ({ data }) => {
    const renderCategoryItem = ({ item }) => {
        return (
            <View style={styles.categoryItem}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>
        );
    };

    // Split data into two rows


    return (
        <View style={styles.container}>
            <ListType title="Category" />
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
