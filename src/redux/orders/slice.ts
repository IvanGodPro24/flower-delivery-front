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

const handlePending = (state: OrderState) => {
  state.loading = true;
};

const handleRejected = (state: OrderState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState: OrderState = {
  cart: [],
  history: [],
  all: [],
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
        state.all = action.payload;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })

      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history = action.payload;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const exists = state.cart.find((o) => o._id === action.payload._id);

        if (!exists) {
          state.cart.push(action.payload);
        } else {
          state.cart = state.cart.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart.push(action.payload);
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
      })

      .addCase(deleteOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if ("message" in action.payload) {
          state.cart = state.cart.filter(
            (item) => item._id !== action.meta.arg.orderId
          );
        } else {
          state.cart = state.cart.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }
      })

      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = state.cart.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })

      .addCase(finalizeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = state.cart.map((item) =>
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
