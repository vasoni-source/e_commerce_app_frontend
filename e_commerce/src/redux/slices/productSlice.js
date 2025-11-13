import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../thunk/productThunk";

const initialState = {
  allProducts: [],
  status: null,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeded";
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
});
export default productSlice.reducer;
