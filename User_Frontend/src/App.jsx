import { Outlet, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Header from "./components/Header";
import { Footer, ServiceSection, SubscribeSection } from "./components";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "./redux/cartSlice";
import { fetchAddress } from "./redux/addressSlice";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      dispatch(addToCart({ userId: userData?._id }));
      dispatch(fetchAddress({ userId: userData?._id }));
    }
  }, [dispatch, userData]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/auth/sign-in");
    // window.location.reload(); // Or navigate to login page
  };

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decoded.exp < currentTime) {
        logoutUser();
      } else {
        // Set timeout to auto-logout when token expires
        setTimeout(logoutUser, (decoded.exp - currentTime) * 1000);
      }
    }
  };

  useEffect(() => {
    checkTokenExpiry();
  }, []);

  return (
    <div className="bg-gray-400 w-full ">
      <Toaster />
      <div className=" w-full min-h-screen bg-gray-100 max-w-[1600px] mx-auto h-full relative">
        <Header />
        <Outlet />
        <SubscribeSection />
        <ServiceSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
