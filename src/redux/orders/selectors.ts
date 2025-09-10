import { RootState } from "../store.types";

export const selectFlowers = (state: RootState) => state.orders.items;

export const selectLoading = (state: RootState) => state.orders.loading;

export const selectError = (state: RootState) => state.orders.error;
