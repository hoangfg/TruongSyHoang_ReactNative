import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ListType from '../../../components/ListType';
import { useNavigation } from '@react-navigation/native';
import CategoryItem from './CategoryItem';

const ListCategory = ({ data }) => {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <ListType title="Nhà xuất bản" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rowContainer}
            >
                {data?.map((item) => (
                    <CategoryItem key={item.id} item={item} />
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
        marginTop: 50,
    },

});

export default ListCategory;
