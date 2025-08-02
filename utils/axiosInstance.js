API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // 🔐 Check for 406 - Unacceptable / Unauthorized access level
    if (err.response?.status === 406) {
      console.error("406 error: Unauthorized access. Redirecting...");

      // Optional cleanup
      localStorage.removeItem("user");

      // Stop further requests and redirect
      if (window.location.pathname !== "/unauthorized") {
        window.location.href = "/unauthorized";
      }

      return Promise.reject(err); // ⛔ STOP: do not retry anything
    }

    // 🔄 Token Refresh Attempt on 401
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
          console.warn("Logout during refresh fail failed silently.");
        }

        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err); // All other errors
  }
);
