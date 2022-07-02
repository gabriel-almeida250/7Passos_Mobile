import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL:"http://localhost:8080/comercio-seguro",
});

export default AxiosInstance;