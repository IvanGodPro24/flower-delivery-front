import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "./orders.types";
import {
  addToCart,
  deleteOrder,
  deleteOrderItem,
  finalizeOrder,
  getAllOrders,
  getCart,
  getHistory,
  getOrderById,
  updateOrderItem,
} from "./operations";
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

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const exists = state.items.find((o) => o._id === action.payload._id);

        if (!exists) {
          state.items.push(action.payload);
        } else {
          state.items = state.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })

      .addCase(deleteOrderItem.fulfilled, (state, action) => {
        if ("message" in action.payload) {
          state.items = state.items.filter(
            (item) => item._id !== action.meta.arg.orderId
          );
        } else {
          state.items = state.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }
      })

      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })

      .addCase(finalizeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("rejected");
      }, handleRejected)

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("pending");
      }, handlePending),
});

export default slice.reducer;
