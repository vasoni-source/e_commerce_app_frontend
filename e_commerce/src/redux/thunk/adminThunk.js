import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllProductsWithoutPagination = createAsyncThunk("all_product", async () => {
  try {
    const res = await axios.get("http://localhost:5000/analytics/all/products");

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
export const getAllOrders = createAsyncThunk("all_orders", async () => {
  try {
    const res = await axios.get("http://localhost:5000/analytics/all_orders");

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
export const getAllUsers = createAsyncThunk("all_users", async () => {
  try {
    const res = await axios.get("http://localhost:5000/analytics/all_users");

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});