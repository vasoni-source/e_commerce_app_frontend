import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createOrder = createAsyncThunk(
  "order",
  async ( {orderItems,totalPrice,shippingAddress,paymentMethod} , { rejectWithValue }) => {
  
    console.log("data from thunk",shippingAddress);
    
    try {
        const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/order", {
        orderItems,totalPrice,shippingAddress,paymentMethod
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("response from api ", res.data.token);
      // localStorage.setItem("token",res.data.token)
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);