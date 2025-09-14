import { RootState } from "../store.types";

export const selectOrders = (state: RootState) => state.orders.all;

export const selectCart = (state: RootState) => state.orders.cart;

export const selectHistory = (state: RootState) => state.orders.history;

export const selectLoading = (state: RootState) => state.orders.loading;

export const selectError = (state: RootState) => state.orders.error;
