import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from 'react-native';

function LoginLoading() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/BeanEater-1s-205px.gif')} style={styles.gif} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    gif: {
        width: 100, // Set the width and height based on your GIF size
        height: 100,
    },
});

export default LoginLoading;
