import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import AppRouter from "./router/AppRouter";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
