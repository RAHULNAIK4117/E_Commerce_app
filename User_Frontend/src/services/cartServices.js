import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/carts/` ,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const updateCart = async ({ userId, productId, quantity }) => {
    try {
        const response = await api.put('update', { userId, productId, quantity });
        return response.data;
        
    } catch (error) {
        return error.response?.data || { message: "Failed to update cart!" };
        
    }
}

export const deleteCart = async ({ userId, productId }) => {
    try {
        const response = await api.delete(`delete/${userId}/${productId}`);
        return response.data;
        
    } catch (error) {
        return error.response?.data || { message: "Failed to delete from cart!" };
        
    }
}

export const clearCart = async (userId) => {
    try {
        const response = await api.delete(`clear/${userId}`)
        return response.data;
        
    } catch (error) {
        return error.response?.data || { message: "Failed to clear cart!" };
    }
}