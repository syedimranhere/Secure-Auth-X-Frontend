import { UseUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth = () => {
  const { isAuthenticated, loading } = UseUserContext();
  //if the loading is complete and the user aint authenticated so redirect him to unauth page

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/unauthorized");
    }
  }, [loading, isAuthenticated]);
  return { isAuthenticated, loading };
};
``;
