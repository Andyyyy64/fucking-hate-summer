import axios from 'axios';

const API_URL = 'https://fucking-hate-summer.onrender.com/data';

export const getData = async () => {
    const res = await axios.get(`${API_URL}/get`)
    return res.data;
}