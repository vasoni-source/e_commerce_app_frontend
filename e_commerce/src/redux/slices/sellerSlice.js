import { createSlice } from "@reduxjs/toolkit";
import { sellerRevenue ,orderPerSeller,productPerSeller,createProduct,updateProduct,deleteProduct} from "../thunk/sellerThunk";

const initialState = {
  revenue: null,
  orders:[],
  singleProduct:null,
  products:[],
  status: null,
  error: null,
};

 export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellerRevenue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sellerRevenue.fulfilled, (state, action) => {
        state.status = "succeded";
        state.revenue = action.payload;
      })
      .addCase(sellerRevenue.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
    //   get all orders
      .addCase(orderPerSeller.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderPerSeller.fulfilled, (state, action) => {
        state.status = "succeded";
        state.orders = action.payload;
      })
      .addCase(orderPerSeller.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

    //   get all products
    .addCase(productPerSeller.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productPerSeller.fulfilled, (state, action) => {
        state.status = "succeded";
        state.products = action.payload;
      })
      .addCase(productPerSeller.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

    //   create product
     .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeded";
        state.singleProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

    //   update product 
     .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeded";
        state.singleProduct = action.payload.updatedProduct;
        state.products = action.payload.products;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

      // delete product
     .addCase(deleteProduct.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = "succeded";
      state.products = action.payload;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      (state.status = "failed"), (state.error = action.payload);
    });
  
  },
});
export default sellerSlice.reducer;