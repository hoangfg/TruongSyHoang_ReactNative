import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'; // Remove "Text" from this line
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Title, Text } from 'react-native-paper';

export default function SearchScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const handleSearch = () => {

        navigation.navigate('ProductList', { search });
        setSearch("")
    };
    return (
        <View style={styles.container}>
            <FormInput
                style={styles.forminput}
                labelName='search'
                value={search}
                autoCapitalize='none'
                onChangeText={(search) => setSearch(search)}
            />
            <FormButton
                title='Search'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={handleSearch}
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
    forminput: {
        width: "90%",

    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    loginButtonLabel: {
        width: "90%",
        fontSize: 22
    },
    navButtonText: {
        fontSize: 16
    }
});
