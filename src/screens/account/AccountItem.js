import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const AccountItem = (data) => {
    const isLoggedIn = data.user !== null;
    if ((data.id === 'login' && !isLoggedIn) || (data.id === 'logout' && isLoggedIn)) {
        return (
            <View
                key={data.id}
                style={[
                    styles.rowWrapper,
                    data.index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                    onPress={() => data.onHandleItemClick(data.id)}>
                    <View style={styles.row}>
                        <FeatherIcon
                            color="#616161"
                            name={data.icon}
                            style={styles.rowIcon}
                            size={22}
                        />

                        <Text style={styles.rowLabel}>{data.label}</Text>

                        <View style={styles.rowSpacer} />

                        {data.type === 'select' && (
                            <Text style={styles.rowValue}>{isLoggedIn ? user.name : ''}</Text>
                        )}

                        {data.type === 'toggle' && (
                            <Switch
                                onChange={(val) => setForm({ ...form, [data.id]: val })}
                                value={form[data.id]}
                            />
                        )}

                        {(data.type === 'select' || data.type === 'link') && (
                            <FeatherIcon
                                color="#ababab"
                                name="chevron-right"
                                size={22}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
        // Return null if the component should not be rendered
        return null;
    }
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionBody: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
    },
    profile: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
    },
    profileName: {
        marginTop: 12,
        fontSize: 20,
        fontWeight: '600',
        color: '#090909',
    },
    profileEmail: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '400',
        color: '#848484',
    },
    profileAction: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        borderRadius: 12,
    },
    profileActionText: {
        marginRight: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
        height: 50,
    },
    rowWrapper: {
        paddingLeft: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
    },
    rowIcon: {
        marginRight: 12,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },
    rowValue: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});
export default AccountItem;