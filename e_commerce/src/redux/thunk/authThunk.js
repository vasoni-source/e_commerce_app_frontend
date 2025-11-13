import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginWithPassword = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      console.log("response from api ", res.data.token);
      localStorage.setItem("token",res.data.token)
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);
