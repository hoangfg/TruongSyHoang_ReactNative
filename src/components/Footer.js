import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Account from '../screens/Account';

import More from '../screens/MoreScreen';
import { Ionicons } from 'react-native-vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../screens/ProductDetailScreen';

import CartUI from '../screens/CartScreen';
import CategoryProducts from '../screens/CategoryScreen';
import ProductList from '../screens/ProductsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={HomeScreen} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
            <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
    );
};

const Footer = () => {


    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Cart"
                component={CartUI}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="apps-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Footer;
