import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ( formData , { rejectWithValue }) => {
  
    console.log("formdat from thunk",formData);
    try {
      const res = await axios.post("http://localhost:5000/user/register/verify-otp", {
        name:formData.name,email:formData.email,password:formData.password,otp:formData.otp
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
