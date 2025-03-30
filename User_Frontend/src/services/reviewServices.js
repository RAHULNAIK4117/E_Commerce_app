import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/review/` ,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const createReview = async (data) => {
    try {
        const response = await api.post('create', data);
        // console.log(response.data);
        
        if(response.data.success){
            toast.success(response.data.message)
            return response.data;
        }
        
    } catch (error) {
        console.error(error);
        
    }
}
