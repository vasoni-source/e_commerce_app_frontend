import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addToCart = createAsyncThunk(
  "cart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await axios.post(
        "https://e-commerce-q22t.onrender.com/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("cart data from api ", res.data);

      return res.data.cart;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed. to add to cart Please try again."
      );
    }
  }
);
export const getCart = createAsyncThunk(
  "cart",
  async (_, { rejectWithValue }) => {
    console.log("inside getcart");
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await axios.get("https://e-commerce-q22t.onrender.com/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("cart data from api ", res.data);

      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || " Failed to find cart Please try again."
      );
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart",
  async (productId, { rejectWithValue }) => {
    console.log("prdocustId",productId)
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await axios.delete(
        "https://e-commerce-q22t.onrender.com/cart",{
        data:{ productId },
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("cart data from api ", res.data);

      return res.data.cart;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove cart Please try again."
      );
    }
  }
);
