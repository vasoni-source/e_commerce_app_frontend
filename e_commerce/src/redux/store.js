import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
export const store = configureStore({
    reducer:{
        
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
        order:orderReducer
    }
})
export default store;