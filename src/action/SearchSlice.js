import AsyncStorage from '@react-native-async-storage/async-storage';

const addToHistory = async (searchKeyword) => {
    try {
        // Lấy danh sách tìm kiếm từ AsyncStorage
        const existingSearch = await AsyncStorage.getItem('searchs');
        let searchHistory = existingSearch ? JSON.parse(existingSearch) : [];


        const existingKeywordIndex = searchHistory.findIndex(item => item === searchKeyword);

        if (existingKeywordIndex !== -1) {

            searchHistory = [
                searchKeyword,
                ...searchHistory.slice(0, existingKeywordIndex),
                ...searchHistory.slice(existingKeywordIndex + 1)
            ];
        } else {

            searchHistory = [searchKeyword, ...searchHistory];
        }


        if (searchHistory.length > 10) {
            searchHistory = searchHistory.slice(0, 10);
        }


        await AsyncStorage.setItem('searchs', JSON.stringify(searchHistory));
    } catch (error) {
        console.error('Lỗi khi thêm từ khóa tìm kiếm vào lịch sử:', error);
    }
};

const getAll = async () => {
    try {
        const searchData = await AsyncStorage.getItem('searchs');
        return searchData ? JSON.parse(searchData) : [];
    } catch (error) {
        console.error('Error getting cart data:', error);
        return [];
    }
};
export { getAll, addToHistory };