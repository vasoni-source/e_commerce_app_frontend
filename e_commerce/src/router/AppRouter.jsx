import React from 'react'
import Home from "../pages/Home/Home";
import { Router,Routes,Route } from "react-router-dom";
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Cart from '../pages/User/Cart';
import Otp from '../pages/Auth/Otp';
export default function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user/login' element={<Login/>}/>
            <Route path='/user/verify_account' element={<Otp/>}/>
            <Route path='/user/register' element={<SignUp/>}/>
            <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </div>
  )
}

