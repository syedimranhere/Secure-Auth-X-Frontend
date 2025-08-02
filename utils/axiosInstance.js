import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;
const API = axios.create({
  baseURL: `${BASE}/api/v1`,
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Handle 406: No active session or unacceptable auth state
    if (err.response?.status === 406) {
      console.warn("No active session. Redirecting to /unauth...");
      if (window.location.pathname !== "/unauthorized") {
        window.location.href = "/unauthorized";
      }
      return Promise.reject(err);
    }

    // Handle 401: Access token expired, attempt refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await API.get("/user/refresh", {
          withCredentials: true,
        });

        console.log("Token refreshed successfully");

        const newAccessToken = refreshResponse.data?.accessToken;
        if (newAccessToken) {
          API.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return API(originalRequest);
      } catch (refreshErr) {
        console.error("Token refresh failed. Redirecting to login...");

        try {
          await API.post("/user/logout", { withCredentials: true });
        } catch (logoutErr) {
          console.warn("Silent logout failure.");
        }

        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
