import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ListType = ({ title, type }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            {type !== "category" && (
                <View>
                    <Text>Xem tất cả</Text>
                </View>
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
