import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sellerRevenue = createAsyncThunk(
  "seller_revenue",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://e-commerce-q22t.onrender.com/analytics/revenue_per_seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log("revenue", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch revenue field Please try again."
      );
    }
  }
);
export const orderPerSeller = createAsyncThunk(
  "seller_orders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://e-commerce-q22t.onrender.com/order/sellerOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log("orders", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch orders Please try again."
      );
    }
  }
);
export const updateOrderField = createAsyncThunk(
  "update_order",
  async ({orderId,status}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://e-commerce-q22t.onrender.com/order/${orderId}`,{status},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log("orders", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update order Please try again."
      );
    }
  }
);
export const productPerSeller = createAsyncThunk(
  "seller_products",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://e-commerce-q22t.onrender.com/analytics/seller_products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("products", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products Please try again."
      );
    }
  }
);
export const createProduct = createAsyncThunk(
  "create_product",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("image", product.image); 
      const res = await axios.post(
        "https://e-commerce-q22t.onrender.com/product",formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("products", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to craete product Please try again."
      );
    }
  }
);
export const updateProduct = createAsyncThunk(
  "update_product",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("image", product.image); 
      const res = await axios.patch(
        `https://e-commerce-q22t.onrender.com/product/${product._id}`,formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("products", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update product Please try again."
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete_product",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.delete(
        `https://e-commerce-q22t.onrender.com/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("products", res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete product Please try again."
      );
    }
  }
);


