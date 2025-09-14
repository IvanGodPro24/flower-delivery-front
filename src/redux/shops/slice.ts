import { createSlice } from "@reduxjs/toolkit";
import { ShopState } from "./shops.types";
import { getAllShops } from "./operations";

const initialState: ShopState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "shops",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getAllShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(getAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default slice.reducer;
