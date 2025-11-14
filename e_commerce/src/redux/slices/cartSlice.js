import { createSlice } from "@reduxjs/toolkit";
import { addToCart ,getCart,removeCartItem} from "../thunk/cartThunk";

const initialState = {
  cart: {},
  status: null,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeded";
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeded";
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "succeded";
        state.cart = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
});
export default cartSlice.reducer;
