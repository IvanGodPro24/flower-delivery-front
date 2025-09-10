import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlowersState } from "./flowers.types";
import { getAllFlowers } from "./operations";
import { ShopState } from "../shops/shops.types";
import { OrderState } from "../orders/orders.types";

export const handlePending = (state: FlowersState | ShopState | OrderState) => {
  state.loading = true;
};

export const handleRejected = (
  state: FlowersState | ShopState | OrderState,
  action: PayloadAction<any>
) => {
  state.loading = false;
  state.error = action.payload;
};

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
      .addCase(getAllFlowers.fulfilled, (state, action) => {
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
