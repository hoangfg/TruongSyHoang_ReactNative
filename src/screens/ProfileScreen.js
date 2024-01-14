import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid, Modal,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS, Items } from '../assets/JS/COLOURS';
import { clearCart, getAll, removeFromCart, updateQuantity } from '../action/CartSlice';
import { useNavigation } from '@react-navigation/native';
import { fetchUserById } from './../api/UserApi';
import { useAuth } from '../utils/AuthProvider';
import { TextInput } from 'react-native-paper';






const ProfileScreen = ({ route }) => {

    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { user } = useAuth();
    console.log(user)


    return (
        <View
            style={{
                width: '100%',
                height: '92%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>

            <ScrollView>
                <View
                    style={{
                        width: '100%',

                        flexDirection: 'row',
                        paddingTop: 16,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundDark,
                                padding: 12,
                                backgroundColor: COLOURS.backgroundLight,
                                borderRadius: 12,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                        }}>
                        Thông tin thành viên
                    </Text>
                    <View>

                    </View>
                </View>
                <View style={{ width: '100%' }}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={{ height: 200, resizeMode: 'contain', borderRadius: 8, marginTop: 10 }}
                    />
                </View>

                <View style={{ paddingHorizontal: 16, height: "80%", }}>
                    <Text style={{ fontSize: 20, color: COLOURS.black, fontWeight: '500', letterSpacing: 1, paddingTop: 20 }}>
                        Thông tin tài khoản
                    </Text>
                    <Text>Name:</Text>
                    <TextInput
                        value={user.name}
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
                        editable={false}
                    />
                    <Text>Email:</Text>
                    <TextInput
                        value={user.email}
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
                        editable={false}
                    />
                </View>


            </ScrollView>


        </View>
    );
};

export default ProfileScreen;