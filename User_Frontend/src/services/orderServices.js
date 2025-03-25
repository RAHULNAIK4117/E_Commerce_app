import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/orders/` ,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const makeOrder = async (order) => {
    try {
        const response = await api.post('addOrder', order);
        return response.data;
        
    } catch (error) {
        return error.response?.data || { message: "Failed to add order!" };
        
    }
}