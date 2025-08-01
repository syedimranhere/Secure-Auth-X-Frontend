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

        // FIXED: Only make backend verification if we have saved user data
        // This prevents unnecessary requests on public pages
        if (savedUser) {
          const response = await API.get('/user/verify-access', {
            withCredentials: true,
          });

          // FIXED: Backend only returns {message: "Tokens Valid"}, not user data
          // If verification succeeds, keep the saved user data
          if (response.status === 200) {
            // User is authenticated, keep existing user data
            console.log('Authentication verified');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // FIXED: Only clear auth state if it's actually an auth failure
        if (error.response?.status === 401 || error.response?.status === 403) {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("user");
        }
        // For network errors or other issues, don't clear auth state
      } finally {
        setLoading(false);
      }
    };

    // FIXED: Only run auth check if we're not on public pages
    const publicPaths = ['/', '/login', '/register', '/about', '/forgotpassword', '/resetpassword', '/unauthorized'];
    const currentPath = window.location.pathname;

    if (publicPaths.includes(currentPath)) {
      // On public pages, just check localStorage without making API calls
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (parseError) {
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    } else {
      // On protected pages, run full auth check
      checkAuth();
    }
  }, []);

  // Method to manually clear auth state
  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Method to set user data (for login)
  const setUserData = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser: setUserData, // FIXED: Use the wrapper function
      isAuthenticated,
      setIsAuthenticated,
      loading,
      clearAuth
    }}>
      {children}
    </UserContext.Provider>
  );
};