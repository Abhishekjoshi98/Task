import { createSlice } from "@reduxjs/toolkit";

export const repoDataSlice = createSlice({
  name: "repoData",
  initialState: [],
  reducers: {
    repoData: (state, action) => (state = action.payload),
  },
});

//dispatch
export const { repoData } = repoDataSlice.actions;

//configureStore
export default repoDataSlice.reducer;