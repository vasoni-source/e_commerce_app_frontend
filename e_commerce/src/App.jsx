import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import AppRouter from "./router/AppRouter";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state)=>state.user.user);
  return (
    <div>
      <BrowserRouter>
       { 
        user?.role ==="seller" || user?.role==="admin"? null : <Navbar />
       }
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
