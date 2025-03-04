import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Footer, ServiceSection, SubscribeSection } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-400 w-full ">
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
