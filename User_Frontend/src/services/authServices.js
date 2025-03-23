import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/` ,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signUp = async (user) => {
    try {
        const response = await api.post('register', user);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
};

export const signIn = async (user) => {
    try {
        const response = await api.post('login', user);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
};

export const getUserDetails = async (token) => {
    try {
        const response = await api.get('user-details', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
        
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
}
