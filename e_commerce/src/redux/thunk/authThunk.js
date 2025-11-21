import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ( formData , { rejectWithValue }) => {
  
    console.log("formdat from thunk",formData);
    try {
      const res = await axios.post("https://e-commerce-q22t.onrender.com/user/register/verify-otp", {
        name:formData.name,email:formData.email,password:formData.password,otp:formData.otp
      });

      // console.log("response from api ", res.data.token);
      // localStorage.setItem("token",res.data.token)
      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "SignUp failed. Please try again."
      );
    }
  }
);
export const loginWithPassword = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://e-commerce-q22t.onrender.com/user/login", {
        email,
        password,
      });

      console.log("response from api ", res.data.token);
      localStorage.setItem("token",res.data.token)
      Cookies.set('token', res.data.token, { expires: 0.5 });
      Cookies.set('user', JSON.stringify(res.data.user), { expires: 0.5 });

      return res.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  }
);
// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://e-commerce-q22t.onrender.com/user/forgot-password",
        { email }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to send reset email"
      );
    }
  }
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        "https://e-commerce-q22t.onrender.com/user/reset-password",
        { token, password }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
 