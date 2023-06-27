// First we need to import axios.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/",
});

// axiosInstance.defaults.headers.common["Authorization"] = localStorage.getItem("auth_token");
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
// const navigate = useNavigate();

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token || "";
  return config;
});

export const setupResponseInterceptor = (navigate:any) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        // console.log("unauthorized");
        // navigate("/unauthorized");
      } else {
        return Promise.reject(error);
      }
    }
  );
}



export default axiosInstance;
