import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons từ thư viện Expo

export default function Header() {
    return (
        <View style={styles.header}>
            {/* Logo và nút tìm kiếm bên trái */}
            <View style={styles.leftContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/favicon.png')}
                />
            </View>

            {/* Nút tìm kiếm bên phải */}
            <TouchableOpacity onPress={() => console.log('Right button pressed')}>
                <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        // paddingVertical: 8,
        backgroundColor: 'white',
        paddingTop: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 }, // Kích thước của bóng
        shadowRadius: 4, // Bán kính của bóng
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    searchButton: {
        fontSize: 16,
        color: 'blue',
    },
});
