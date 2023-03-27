// First we need to import axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:  "http://localhost:5173/"
});

axiosInstance.defaults.headers.common["Authorization"] = localStorage.getItem("auth_token");
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";




export default axiosInstance;