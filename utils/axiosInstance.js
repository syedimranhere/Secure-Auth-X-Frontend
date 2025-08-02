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

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await API.get("/user/refresh", {
          withCredentials: true,
        });

        console.log("Token refreshed successfully");

        // Optional: Attach new access token (only if using header-based auth)
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
          console.warn("Logout during refresh fail failed silently.");
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
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
