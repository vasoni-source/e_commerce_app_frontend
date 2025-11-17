import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist,getWishlist,removeWishlistItem } from "../thunk/wishlistThunk";

const initialState = {
  wishlist: {},
  status: null,
  error: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "succeded";
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })

    //   getWishlist
    .addCase(getWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = "succeded";
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
    //   remove wishlist
    .addCase(removeWishlistItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.status = "succeded";
        state.wishlist = action.payload.wishlist;
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
  
});
export default wishlistSlice.reducer;