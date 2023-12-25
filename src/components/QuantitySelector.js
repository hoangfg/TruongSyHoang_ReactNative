import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantitySelector = ({ quantity }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    const decrementQuantity = () => {
        if (localQuantity > 1) {
            setLocalQuantity(localQuantity - 1);
        }
    };

    const incrementQuantity = () => {
        setLocalQuantity(localQuantity + 1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.borderBtn} onPress={decrementQuantity}>
                <Text style={styles.borderBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{localQuantity}</Text>
            <TouchableOpacity style={styles.borderBtn} onPress={incrementQuantity}>
                <Text style={styles.borderBtnText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    borderBtnText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    quantityText: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
});

export default QuantitySelector;
