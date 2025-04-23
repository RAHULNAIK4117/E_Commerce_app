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

export const getOrders = async (userId) => {
    try {
        const response = await api.get(`get/${userId}`);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "Failed to get orders!" };
    }
}

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.put(`update/${orderId}`, { orderStatus: status });
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "Failed to update order status!" };
    }
}