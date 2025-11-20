import { createSlice } from "@reduxjs/toolkit";
import { getAllProductsWithoutPagination,getAllOrders,getAllUsers } from "../thunk/adminThunk";

const initialState = {
  revenue: null,
  users:[],
  orders: [],
  orderCount:0,
  totalRevenue:0,
  averageOrderAmount:0,
  products: [],
  status: null,
  error: null,
};

export const sellerSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsWithoutPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductsWithoutPagination.fulfilled, (state, action) => {
        state.status = "succeded";
        state.products = action.payload;
      })
      .addCase(getAllProductsWithoutPagination.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
    //   get all orders 
     .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeded";
        state.orders = action.payload.allOrders;
        state.orderCount = action.payload.countOfOrders;
        state.totalRevenue = action.payload.totalRevenue;
        state.averageOrderAmount = action.payload.averageOrderAmount;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
    //   get all users customers
    .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

  },
});
export default sellerSlice.reducer;