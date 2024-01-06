import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";



const ListType = ({ title, type, onPress }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            {type !== "hiden" && (
                <TouchableOpacity onPress={onPress}>
                    <View>
                        <Text>Xem tất cả</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    title: {
        color: "red",
        fontSize: 15,
        fontWeight: "bold",
    },
});

export default ListType;
