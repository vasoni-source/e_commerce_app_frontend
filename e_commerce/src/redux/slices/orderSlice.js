import { createSlice } from "@reduxjs/toolkit";
import { createOrder ,getOrders,cancelOrder} from "../thunk/orderThunk";

const initialState = {
  order: [],
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
        // state.order = action.payload;
         state.order.push(action.payload.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      // getorders 

      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeded";
        state.order = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

      // cacel order 
       .addCase(cancelOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = "succeded";
        state.order = action.payload.orders;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
});
export default orderSlice.reducer;
