import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Title } from 'react-native-paper';


import { useAuth } from '../utils/AuthProvider';
import LoginLoading from '../components/LoginLoading';

import { getUserProfile, login } from '../api/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleCheckEmail = text => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{4,9}$/im;
        setEmail(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false)
        } else {
            setCheckValidEmail(true);
        }
    }

    const handleLogin = async () => {
        setLoading(true);
        setLoginError('');

        try {
            const result = await login({
                usernameOrEmail: email,
                password: password
            });
            // AsyncStorage.removeItem('access_token');
            await AsyncStorage.setItem('access_token', result.accessToken);
            const userProfile = await getUserProfile();
            console.log("userProfile", userProfile)
            authLogin(userProfile);
            navigation.navigate('HomeStack');

        } catch (error) {
            // Xử lý lỗi
            console.error("Login failed:", error);

            // ... (Xử lý lỗi khác nếu cần)
        } finally {

            setLoading(false);
        }
    }
    if (loading) {
        return <LoginLoading />;
    }

    return (
        <View style={styles.container}>
            <Title style={styles.titleText}>Đăng nhập!</Title>

            <FormInput
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={(userEmail) => handleCheckEmail(userEmail)}
            />
            {checkValidEmail && <Text style={styles.errorText}>Please enter a valid email address</Text>}

            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={seePassword}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />

            {loginError !== '' && <Text style={styles.errorText}>{loginError}</Text>}

            <FormButton
                title='Đăng nhập'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={handleLogin}
            />

            <FormButton
                title='Đăng ký'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => navigation.navigate('RegisterScreen')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center'
    }
});
