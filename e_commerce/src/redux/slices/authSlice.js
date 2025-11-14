import { createSlice } from "@reduxjs/toolkit";
import { loginWithPassword ,signUp} from "../thunk/authThunk";

const initialState = {
  user: {},
  token: "",
  status: null,
  error: null,
};

export const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.status = "succeded";
        state.token = action.payload;
        state.user = action.payload
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });  
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeded";
        // state.token = action.payload;
        state.user = action.payload
      })
      .addCase(signUp.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });  
  },
});
export default productSlice.reducer;
