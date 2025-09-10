import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopState } from "./shops.types";
import { getAllShops } from "./operations";
import { handlePending, handleRejected } from "../flowers/slice";

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
      .addCase(getAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("rejected");
      }, handleRejected)

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("pending");
      }, handlePending),
});

export default slice.reducer;
