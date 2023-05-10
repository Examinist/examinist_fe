// First we need to import axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/",
});

// axiosInstance.defaults.headers.common["Authorization"] = localStorage.getItem("auth_token");
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token || "";
  return config;
});

export default axiosInstance;
