import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createOrder = createAsyncThunk(
  "create_order",
  async (
    { orderItems, totalPrice, shippingAddress, paymentMethod },
    { rejectWithValue }
  ) => {
    console.log("data from thunk", shippingAddress);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/order",
        {
          orderItems,
          totalPrice,
          shippingAddress,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response from api ", res.data.token);
      // localStorage.setItem("token",res.data.token)
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to craete order Please try again."
      );
    }
  }
);

export const getOrders = createAsyncThunk(
  "get_order",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/order/ordersByUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response from order api ", res.data);
      // localStorage.setItem("token",res.data.token)
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed. to get orders Please try again."
      );
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "cancel_order",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/order/${orderId}`, {
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
        error.response?.data?.message ||
          "Failed to cancel order Please try again."
      );
    }
  }
);
