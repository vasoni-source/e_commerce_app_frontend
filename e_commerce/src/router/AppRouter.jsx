import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Cart from "../pages/User/Cart";
import Otp from "../pages/Auth/Otp";
import Profile from "../pages/User/Profile";
import ProductDetail from "../pages/Home/ProductDetail";
import Wishlist from "../pages/User/Wishlist";
import SellerDashboard from "../pages/Seller/SellerDashboard";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product_detail/:id" element={<ProductDetail />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/verify_account" element={<Otp />} />
      <Route path="/user/register" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* seller-Routes */}
      <Route path="/seller_dashboard" element={<SellerDashboard />} />

    </Routes>
  );
}
