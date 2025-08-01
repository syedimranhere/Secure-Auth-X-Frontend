import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/UserContext.jsx";

// FIXED: This hook should ONLY be used on protected pages
// It should NOT be imported or used on public pages like Home, Login, Register, About, etc.
export const useAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UseUserContext();

  useEffect(() => {
    // FIXED: Only redirect if loading is complete AND user is not authenticated
    if (!loading && !isAuthenticated) {
      // FIXED: Redirect to login instead of unauthorized page
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return { loading, isAuthenticated };
};
