import { createSlice } from "@reduxjs/toolkit";
import { FlowersState } from "./flowers.types";
import { getAllFlowers } from "./operations";

const initialState: FlowersState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "flowers",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getAllFlowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllFlowers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(getAllFlowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default slice.reducer;
