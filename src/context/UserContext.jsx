import axios from 'axios';
import { useEffect, createContext, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import API from '../../utils/axiosInstance';

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
        // First, try to get cached user data
        const savedUser = localStorage.getItem("user");
        let cachedUser = null;
        if (savedUser) {
          try {
            cachedUser = JSON.parse(savedUser);
            // Set cached data immediately to prevent redirect
            setUser(cachedUser);
            setIsAuthenticated(true);
          } catch (parseError) {
            console.error('Failed to parse saved user data:', parseError);
            localStorage.removeItem("user");
          }
        }

        // Then verify with backend
        const response = await axios.get('/api/v1/user/verify-access');

        if (response.data.success && response.data.user) {
          // Update with fresh data from backend
          setUser(response.data.user);
          setIsAuthenticated(true);
          console.log('Auth verified:', response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          // Backend says not authenticated, clear everything
          setUser(null);
          navigate("/unauthorized");
          setIsAuthenticated(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error('Auth verification failed:', error);

        // Only clear auth on actual auth failures (401/403)
        if (error.response?.status === 401 || error.response?.status === 403) {
          setUser(null);
          navigate("/unauthorized");
          setIsAuthenticated(false);
          setLoading(false);
          localStorage.removeItem("user");
        }

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