import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://backend-inventariouid.onrender.com'
});

export {
    axiosInstance
}