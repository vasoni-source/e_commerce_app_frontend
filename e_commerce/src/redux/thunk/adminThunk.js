import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createAcountByAdmin = createAsyncThunk("create_acount", async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/user/registerByAdmin",data);

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
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

export const getAllOrdersByUser = createAsyncThunk("all_usersOrders", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/analytics/orders_per_user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
export const getAllSellersStats = createAsyncThunk("sellers_stats", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/analytics/sellers_stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response from api ", res.data);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});
