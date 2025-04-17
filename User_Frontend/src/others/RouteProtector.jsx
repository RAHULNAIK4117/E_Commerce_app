import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/authServices";
import { setIsAuthenticated, setUserData } from "../redux/authSlice";

const RouteProtector = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails(token);
      // console.log(response);
      if (response.success) {
        dispatch(setUserData(response.user));
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

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
