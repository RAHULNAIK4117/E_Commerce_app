import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Footer, ServiceSection, SubscribeSection } from "./components";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "./redux/cartSlice";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if(userData){
      dispatch(addToCart({userId: userData?._id}));
    }
  }, [dispatch, userData]);

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
