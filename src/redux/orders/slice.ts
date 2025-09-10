import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "./orders.types";
import { getAllOrders } from "./operations";
import { handlePending, handleRejected } from "../flowers/slice";

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
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
