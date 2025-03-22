import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/banner/` ,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBanners = async () => {
    try {
        const response = await api.get('get');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
}