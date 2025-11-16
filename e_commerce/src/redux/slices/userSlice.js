// import { createSlice } from "@reduxjs/toolkit";
// import { upadteUserField} from "../thunk/authThunk";

// const initialState = {
//   user: {},
//   status: null,
//   error: null,
// };

// export const userDataSlice = createSlice({
//   name: "userData",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(upadteUserField.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(upadteUserField.fulfilled, (state, action) => {
//         state.status = "succeded";
//         state.user = action.payload;
//       })
//       .addCase(upadteUserField.rejected, (state, action) => {
//         (state.status = "failed"), (state.error = action.payload);
//       })
  
//   },
// });
// export default userDataSlice.reducer;
