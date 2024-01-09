import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Toast } from 'react-native-toast-message';
import { addToHistory, getAll } from '../action/SearchSlice';

export default function SearchScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        // Load search history from AsyncStorage on component mount
        loadSearchHistory();
    }, []);

    const handleSearch = () => {
        handleAddToSearch(search);

        navigation.navigate('ProductList', { search });
        setSearch('');
    };

    const handleAddToSearch = async (searchKeyword) => {
        try {
            await addToHistory(searchKeyword);
            loadSearchHistory();
        } catch (error) {
            console.error('Error adding item to history:', error);
        }
    };

    const loadSearchHistory = async () => {
        try {
            const history = await getAll();
            setSearchHistory(history);
        } catch (error) {
            console.error('Error loading search history:', error);
        }
    };

    const renderHistoryItem = (item, index) => (
        <TouchableOpacity
            key={`${item}-${index}`}
            style={styles.historyItem}
            onPress={() => handleHistoryItemSelected(item)
            }
        >
            <Text>{item}</Text>
        </TouchableOpacity >
    );

    const handleHistoryItemSelected = (selectedKeyword) => {

        setSearch((prevSearch) => {

            console.log(prevSearch);
            navigation.navigate('ProductList', { search: selectedKeyword });
            return selectedKeyword;
        });

    };

    return (
        <View style={styles.container}>
            <FormInput
                style={styles.forminput}
                labelName='search'
                value={search}
                autoCapitalize='none'
                onChangeText={(text) => setSearch(() => text)}
            />
            <FormButton
                title='Search'
                modeValue='contained'
                onPress={handleSearch}
            />

            {/* Render search history as a FlatList */}
            <View style={styles.historyContainer}>
                <Text style={styles.historyHeader}>Search History</Text>
                {searchHistory.map(renderHistoryItem)}
                {searchHistory.length === 0 && (
                    <Text style={styles.historyEmpty}>No search history</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    forminput: {
        width: '90%',
        marginBottom: 10,
    },
    historyContainer: {
        width: '100%',
        marginTop: 10,
    },
    historyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    historyEmpty: {
        textAlign: 'center',
        marginTop: 10,
        color: '#888',
    },
});