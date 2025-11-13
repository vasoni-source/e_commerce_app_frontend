import React from 'react'
import Home from "../pages/Home/Home";
import { Router,Routes,Route } from "react-router-dom";
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
export default function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='user/login' element={<Login/>}/>
            <Route path='user/register' element={<SignUp/>}/>

        </Routes>
    </div>
  )
}

