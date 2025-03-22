import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    if (!token && !pathname.includes("/auth")) {
      navigate("/auth/sign-in");
    } else if (token && pathname.includes("/auth")) {
      navigate("/");
    } 
  }, [token, navigate, pathname]);

  return <>{children}</>;
};

export default RouteProtector;
