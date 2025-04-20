import axios from 'axios';

const productAPI = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/products/` ,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getProducts = async ({ category, subCategory, search, page, limit }) => {
    // console.log({ category, subCategory, search, page, limit });

    try {
        const response = await productAPI.get('get', {
            params:{
                category,
                subCategory,
                search,
                page,
                limit
            }
        });
        return response.data;
        
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
        
    }
}

export const getProductDetails = async (id) => {
    try {
        const response = await productAPI.get(`get/${id}`);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
}