import { createSlice } from "@reduxjs/toolkit";
import { loginWithPassword ,signUp,forgotPassword,resetPassword} from "../thunk/authThunk";
import updateUserField from "../thunk/userThunk"
import Cookies from 'js-cookie';
let parsedUser = null;
const userCookie = Cookies.get('user');

if (userCookie) {
  try {
    parsedUser = JSON.parse(userCookie);
  } catch (err) {
    console.error("Error parsing user cookie:", err);
    parsedUser = null;
  }
}
console.log("parsed user",parsedUser)
const initialState = {
  user: parsedUser,
  token: "",
  // isAuthenticated:false,
  status: null,
  error: null,
  message:"",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut:(state)=>{
      state.user = null,
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.status = "succeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        // state.isAuthenticated = true;
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
  
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        // state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeded";
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      // reset password 
     
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeded";
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      // userData 
      .addCase(updateUserField.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserField.fulfilled, (state, action) => {
        state.status = "succeded";
        state.user = action.payload;
      })
      .addCase(updateUserField.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
  },
});
export const {logOut} = userSlice.actions;
export default userSlice.reducer;
