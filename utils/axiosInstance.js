// axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1", // can use 'http://localhost:6999/api/v1' if not using proxy
  withCredentials: true, // we are doing as we will send cookies later
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get("/api/v1/user/refresh-token", {
          withCredentials: true,
        });
        return API(originalRequest); // Retrying original request
      } catch (refreshErr) {
        console.error("Refresh token invalid/expired. Logging out...");
        window.location.href = "/login"; // Or handle logout properly
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
