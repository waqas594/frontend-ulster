import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://ulster-video-share.azurewebsites.net",
});

// Add Authorization Token Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assume token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
