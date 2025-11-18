import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  searchProduct,
  filterProductByCategory,
} from "../thunk/productThunk";

const initialState = {
  allProducts: [],
  productDetail: null,
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
      })

      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeded";
        state.productDetail = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      // search prdouct

      .addCase(searchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.status = "succeded";
        state.allProducts = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      // filter
      .addCase(filterProductByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterProductByCategory.fulfilled, (state, action) => {
        state.status = "succeded";
        console.log("action.payload",action.payload)
        state.allProducts = action.payload;
      })
      .addCase(filterProductByCategory.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
});
export const { setSearchQuery, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
