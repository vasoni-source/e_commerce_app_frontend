import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../thunk/orderThunk";

const initialState = {
  order: {},
  status: null,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeded";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
});
export default orderSlice.reducer;
