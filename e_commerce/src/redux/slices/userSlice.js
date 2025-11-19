import { createSlice } from "@reduxjs/toolkit";
import { sellerRevenue } from "../thunk/sellerThunk";

const initialState = {
  revenue: null,
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
  
  },
});
export default sellerSlice.reducer;
