import { useEffect, createContext, useState, useContext } from 'react';
import API from '../../utils/axiosInstance';

export const UserContext = createContext();
export const UseUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // FIXED: Check localStorage first for faster initial load
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIsAuthenticated(true);
          } catch (parseError) {
            console.error('Failed to parse saved user data:', parseError);
            localStorage.removeItem("user");
          }
        }

        // Verify with backend
        const response = await API.get('/user/verify-access', {
          withCredentials: true,
        });

        const data = response.data;

        // FIXED: Handle the updated backend response structure
        if (data.username && data.fullname && data.email) {
          const userData = {
            username: data.username,
            fullname: data.fullname,
            email: data.email
          };
          setUser(userData);
          setIsAuthenticated(true);
          // Update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          throw new Error('Invalid user data received from server');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // FIXED: Clear everything on auth failure
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");

        // Only redirect to login if it's a real auth failure, not a network error
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Don't redirect here - let components handle it
          console.log('Authentication failed - user needs to login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // FIXED: Add method to manually clear auth state
  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      loading,
      clearAuth
    }}>
      {children}
    </UserContext.Provider>
  );
};