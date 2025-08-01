import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/UserContext.jsx";

export const useAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UseUserContext();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, loading, navigate]);

  return { loading };
};
