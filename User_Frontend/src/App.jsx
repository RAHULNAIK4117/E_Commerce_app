import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Footer, ServiceSection, SubscribeSection } from "./components";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <div className="bg-gray-400 w-full ">
      <Toaster/>
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
