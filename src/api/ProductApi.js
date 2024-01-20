import ApiBase from "./ApiBase";


export const getBooks = async (pageNo, pageSize, sortBy, sortDir) => {
    try {
        const response = await ApiBase.get('/admin/books', {
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
export const getBooksBySearch = async (name, pageNo, pageSize, sortBy, sortDir) => {
    try {
        const response = await ApiBase.get('/admin/books/search', {
            params: {
                name,
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
export const getBook = async (id) => {
    try {
        const response = await ApiBase.get(`/admin/books/${id}`)
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // You may want to handle errors differently
    }
};

