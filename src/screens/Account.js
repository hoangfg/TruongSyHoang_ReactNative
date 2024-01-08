
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormButton from '../components/FormButton';


const Account = () => {
    const navigation = useNavigation();
    const navigateToLogin = () => {
        navigation.navigate('LoginScreen');
    };
    return (
        <View style={styles.container}>

            <FormButton
                title='Login'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={
                    navigateToLogin
                }
            />

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    loginButtonLabel: {
        fontSize: 22
    },
    navButtonText: {
        fontSize: 16
    }
});

export default Account