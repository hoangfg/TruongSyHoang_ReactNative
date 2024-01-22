
import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAuth } from '../utils/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import AccountItem from './account/AccountItem';
import ProfileScreen from './ProfileScreen';
const SECTIONS = [

    {
        header: 'Chức năng',
        items: [
            { id: 'login', icon: 'log-in', label: 'Đăng nhập', type: 'link' },
            { id: 'logout', icon: 'log-out', label: 'Đăng xuất', type: 'link' },
        ],
    },
];

export default function Account() {
    const navigation = useNavigation();
    const { logout } = useAuth();
    const [isLogin, setIsLogin] = useState(false)
    const [isLogout, setIsLogout] = useState(true)
    const handleItemClick = (id) => {
        if (id === 'login') {
            navigation.navigate('LoginScreen');
        } else if (id === 'logout') {

            logout();
            setTimeout(() => {
                navigation.navigate('LoginScreen');
            }, 200);

        }
    };

    const [form, setForm] = useState({
        language: 'English',
        darkMode: true,
        wifi: false,
    });
    const { user } = useAuth();
    const navigateToProfileScreen = () => {
        navigation.navigate('ProfileScreen');
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
            <ScrollView contentContainerStyle={styles.container}>


                {user && (<View style={styles.profile}>

                    {user.avatar && (
                        <Image
                            alt={user?.name}
                            source={{
                                uri: user?.avatar,
                            }}
                            style={styles.profileAvatar}
                        />
                    )}
                    <Text style={styles.profileName}>{user?.name}</Text>

                    <Text style={styles.profileEmail}>{user?.email}</Text>
                    <Text style={styles.profileEmail}>{user?.role}</Text>

                    <TouchableOpacity
                        onPress={navigateToProfileScreen}>
                        <View style={styles.profileAction}>
                            <Text style={styles.profileActionText}>Sửa thông tin</Text>

                            <FeatherIcon color="#fff" name="edit" size={16} />
                        </View>
                    </TouchableOpacity>
                </View>)
                }

                {SECTIONS.map(({ header, items }) => (
                    <View style={styles.section} key={header}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{header}</Text>
                        </View>
                        <View style={styles.sectionBody}>
                            {items.map(({ id, label, icon, type, value }, index) => (
                                <AccountItem
                                    key={id}
                                    id={id}
                                    label={label}
                                    icon={icon}
                                    type={type}
                                    value={value}
                                    index={index}
                                    onHandleItemClick={handleItemClick}
                                    user={user}
                                    form={form}
                                    setForm={setForm}
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
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