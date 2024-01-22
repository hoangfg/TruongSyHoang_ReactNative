import axios from 'axios';
import ApiBase from './ApiBase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const login = async data => {
//     try {
//         const result = await ApiBase("/auth/login", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         })
//         console.log("result", result)
//         return result;
//     } catch (error) {
//         console.log("error:", error)
//     }
// }
// export const profile = async accessToken => {
//     try {
//         const result = await ApiBase("/auth/profile", {
//             method: "GET",
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//             }
//         });
//         return result;
//     } catch (error) {
//         console.log(error);
//     }
// };
export const login = async (loginData) => {

    try {
        const response = await axios.post("http://192.168.38.236:8080/api/auth/login", loginData);


        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};

export const register = async (registerData) => {
    console.log("register", registerData)
    try {
        const response = await ApiBase.post("/auth/register", registerData);

        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await ApiBase.post("/auth/logout");
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};

export const getUserProfile = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    const response = await ApiBase.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("1", response)
    console.log("2", response.data)
    return response.data;
};

