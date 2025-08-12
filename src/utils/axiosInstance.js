// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

// Interceptor to add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default axiosInstance;
