import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllProducts = createAsyncThunk("product", async () => {
  try {
    const res = await axios.get("http://localhost:5000/product", {});

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
export const getProductById = createAsyncThunk("productDetail", async (id) => {
  try {
    console.log("id from product thunk", id);

    const res = await axios.get(`http://localhost:5000/product/${id}`, {
      id,
    });

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
export const searchProduct = createAsyncThunk(
  "search_product",
  async ({ searchTerm }, { rejectWithValue }) => {
    console.log("search term from redux",searchTerm)
    try {
      const res = await axios.get("http://localhost:5000/product/search", {
        params: { q: searchTerm },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const filterProductByCategory = createAsyncThunk(
  "filter_product",
  async ( category, { rejectWithValue }) => {
    console.log("category from thunk",category)
    try {
      const res = await axios.get("http://localhost:5000/product/filter_category", {
        params: { category }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
