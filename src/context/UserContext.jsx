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
        const response = await API.get('/user/verify-access"', {
          withCredentials: true,
        });
        const data = response.data;
        setUser({
          username: data.username,
          fullname: data.fullname,
          email: data.email
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </UserContext.Provider>
  );
};
