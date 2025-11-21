import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addToWishlist = createAsyncThunk(
  "add_wishlist",
  async (productId, { rejectWithValue }) => {
    console.log("product if from thunk",productId);
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await axios.post(
        "https://e-commerce-q22t.onrender.com/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("cart data from api ", res.data);

      return res.data.wishlist;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed. to add to wishlist Please try again."
      );
    }
  }
);
export const getWishlist = createAsyncThunk(
  "get_wishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await axios.get("https://e-commerce-q22t.onrender.com/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("wishlist data from api ", res.data);

      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || " Failed to find wishlist Please try again."
      );
    }
  }
);

