import { RootState } from "../store.types";

export const selectShops = (state: RootState) => state.shops.items;

export const selectLoading = (state: RootState) => state.shops.loading;

export const selectError = (state: RootState) => state.shops.error;
