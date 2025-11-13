import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/authSlice";

export const store = configureStore({
    reducer:{
        
        product:productReducer,
        user:userReducer
    }
})
export default store;