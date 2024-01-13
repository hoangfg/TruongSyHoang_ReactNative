import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Title, Text } from 'react-native-paper';
import { login, profile } from '../api/UserApi';

import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../utils/AuthProvider';
import Loading from '../components/Loading';
import LoginLoading from '../components/LoginLoading';

export default function LoginScreen({ navigation }) {
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
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
        // console.log(AsyncStorage.getItem('access_token'))
        // AsyncStorage.removeItem('access_token');
        if (email && password) {
            try {
                const result = await login({
                    email: email,
                    password: password
                });

                if (result.status === 201) {
                    AsyncStorage.setItem('access_token', result.data.access_token);
                    const profileResult = await profile(result.data.access_token);

                    if (profileResult.status === 200) {

                        authLogin(profileResult.data);
                        setLoading(false);
                        navigation.navigate('HomeStack');
                    } else {
                        setLoading(false);
                        console.error("Failed to fetch user profile:", profileResult.status);
                        alert("An error occurred while fetching user profile. Please try again.");
                    }
                } else {
                    setLoading(false);
                    alert("Login failed. Please check your credentials.");
                }
            } catch (error) {
                setLoading(false);
                console.error("Login failed:", error);
                alert("An error occurred during login. Please try again.");
            }
        } else {
            setLoading(false);
            alert("Please enter valid credentials");
        }
    }
    if (loading) {
        return <LoginLoading />
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
            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={seePassword}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />
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
    }
});
