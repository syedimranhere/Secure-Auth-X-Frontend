
import { useEffect, createContext, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../utils/axiosInstance';

export const UserContext = createContext();
export const UseUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      try {
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

        // Verify from backend
        const res = await API.get("/user/verify-access", {
          withCredentials: true,
        });
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          console.log("User verified:", res.data.user);
        }
      } catch (error) {
        console.error("User verification failed:", error?.response?.data || error.message);
        setIsAuthenticated(true);
        setUser(null);
        localStorage.removeItem("user");
        // DO NOT redirect or refresh here — let the Axios interceptor do that
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