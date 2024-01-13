import ApiManager from './ApiManager'

export const login = async data => {
    try {
        const result = await ApiManager("/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const profile = async accessToken => {
    try {
        const result = await ApiManager("/auth/profile", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};