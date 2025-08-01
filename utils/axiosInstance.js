import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // Ensures cookies are sent with requests
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Only attempt refresh on 401 errors and avoid infinite loops
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // FIXED: Use correct refresh endpoint from your routes
        await API.get("/user/refresh", {
          withCredentials: true,
        });
        console.log("Token refreshed successfully");

        // Retry the original request after successful token refresh
        return API(originalRequest);
      } catch (refreshErr) {
        console.error("Token refresh failed. Redirecting to login...");

        // Clear any cached user data
        localStorage.removeItem("user");

        // Only redirect if not already on login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        alert("Session expired. Please log in again.");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
