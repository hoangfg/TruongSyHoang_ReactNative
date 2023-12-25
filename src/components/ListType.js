import React from "react";
import { Text, View, StyleSheet } from "react-native";

type ListTypeProps = {
    title: string;
};

const ListType = ({ title }: ListTypeProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <Text>Xem tất cả</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1, // Thêm border bottom
        borderBottomColor: "gray", // Màu của border bottom
    },
    title: {
        color: "red",
        fontSize: 15,
        fontWeight: "bold",
    },
});

export default ListType;
