import ApiBase from "./ApiBase";


export const getPublishers = async (pageNo, pageSize, sortBy, sortDir) => {
    try {
        const response = await ApiBase.get('/admin/publishers', {
            params: {
                pageNo,
                pageSize,
                sortBy,
                sortDir,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // You may want to handle errors differently
    }
};
export const getPublishersBooks = async (categoryId, pageNo, pageSize, sortBy, sortDir) => {

    try {
        const response = await ApiBase.get(`/admin/publishers/${categoryId}/books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // You may want to handle errors differently
    }
};
export const getPublisher = async (categoryId) => {
    try {
        const response = await ApiBase.get(`/admin/publishers/${categoryId}`)
        console.log(response)
        return response.data;

    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // You may want to handle errors differently
    }
};

