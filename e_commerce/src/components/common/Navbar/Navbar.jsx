import React,{ useState } from 'react'
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();
   const products = useSelector((state) => state?.cart?.cart?.items);
   const cartItems = products? products.length : 0;
  const handleNavigate = ()=>{
    navigator("/user/login")
  }
  const handleCartNavigation = ()=>{
    navigator("/cart");
  }
  return (
     <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">ShopLogo</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Wishlist */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors">
              <Heart className="h-6 w-6" />
              <span className="text-sm font-medium">Wishlist</span>
            </button>

            {/* Cart */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors relative" onClick={handleCartNavigation}>
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm font-medium">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            </button>

            {/* User/Login */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors" onClick={handleNavigate}>
              <User className="h-6 w-6" />
              <span className="text-sm font-medium">Login</span>
            </button>

            {/* Sign Up Button */}
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <button className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 w-full py-2">
              <Heart className="h-6 w-6" />
              <span className="font-medium">Wishlist</span>
            </button>
            
            <button className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 w-full py-2 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="font-medium">Cart</span>
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                3
              </span>
            </button>
            
            <button className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 w-full py-2">
              <User className="h-6 w-6" />
              <span className="font-medium">Login</span>
            </button>
            
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
