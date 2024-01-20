import React, { useState } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'; // Remove "Text" from this line
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Title, Text } from 'react-native-paper';
import { register } from '../api/UserApi';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
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
    const handleChangePassword = (password, cPassword) => {
        if (cPassword != password) {
            ToastAndroid.showWithGravityAndOffset(
                "Mật khẩu khác nhau vui lòng nhập lại",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }
    const handleRegistration = async () => {
        handleChangePassword(password, cPassword);
        const result = await register({
            name: name,
            username: username,
            email: email,
            password: password
        });
        // console.log(result)
        setName('')
        setUsername('')
        setPassword('')
        setCpassword('')
        setEmail('')
        ToastAndroid.showWithGravityAndOffset(
            result,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        navigation.navigate('LoginScreen');
    };
    return (

        <View style={styles.container}>
            <Text>
                <Title style={styles.titleText}>Đăng ký!</Title>
            </Text>
            <FormInput
                labelName='Name'
                value={name}
                autoCapitalize='none'
                onChangeText={(name) => setName(name)}
            />
            <FormInput
                labelName='Username'
                value={username}
                autoCapitalize='none'
                onChangeText={(username) => setUsername(username)}
            />
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
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
            <FormInput
                labelName='Change Password'
                value={cPassword}
                secureTextEntry={true}
                onChangeText={(cPassword) => setCpassword(cPassword)}
            />
            <FormButton
                title='Đăng ký'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={handleRegistration}
            />
            <FormButton
                title='Đăng nhập'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => navigation.navigate('LoginScreen')}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
