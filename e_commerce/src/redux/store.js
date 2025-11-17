import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import wishlistReducer from "./slices/wishlistSlice"
// import userDataReducer from "./slices/userSlice"
export const store = configureStore({
    reducer:{
        
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
        order:orderReducer,
        wishlist:wishlistReducer,
        // userData:userDataReducer
    }
})
export default store;