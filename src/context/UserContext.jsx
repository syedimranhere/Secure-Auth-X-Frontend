
import { useEffect, createContext, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../utils/axiosInstance';

export const UserContext = createContext();
export const UseUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Load cached user from localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const cachedUser = JSON.parse(savedUser);
            setUser(cachedUser);
            setIsAuthenticated(true);
          } catch (e) {
            console.warn("Invalid cached user data. Clearing.");
            localStorage.removeItem("user");
          }
        }

        // Verify user from backend
        const res = await API.get("/user/verify-access", { withCredentials: true });

        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          return;
        }

        throw new Error("User verification failed unexpectedly");

      } catch (error) {
        const status = error.response?.status;

        // If token is expired, attempt refresh
        if (status === 401 || status === 403) {
          try {
            console.log("Attempting token refresh...");
            const refresh = await API.get("/user/refresh-token", { withCredentials: true });

            if (refresh.data.success) {
              const retry = await API.get("/user/verify-access", { withCredentials: true });

              if (retry.data.success && retry.data.user) {
                setUser(retry.data.user);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(retry.data.user));
                return;
              }
            }

          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        }

        // Final fallback: logout and redirect
        console.warn("Authentication failed. Logging out.");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/unauthorized");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);



  // Method to set user data (for login)
  const setUserData = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser: setUserData,
      isAuthenticated,
      setIsAuthenticated,
      loading,

    }}>
      {children}
    </UserContext.Provider>
  );
};