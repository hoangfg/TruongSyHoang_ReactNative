import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'; // Remove "Text" from this line
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Title, Text } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    return (
        <View style={styles.container}>
            <Text>
                <Title style={styles.titleText}>Sign In!</Title>
            </Text>
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
                onChangeText={(userEmail) => setEmail(userEmail)}
            />
            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />
            <FormButton
                title='Sign In'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => {
                    // TODO
                }}
            />
            <FormButton
                title='Sign up here'
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
        // backgroundColor: '#f5f5f5',
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
