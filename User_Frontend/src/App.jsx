import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" w-full min-h-screen h-full relative" >
      <Header/>
      <Outlet />
    </div>
  );
}

export default App;
