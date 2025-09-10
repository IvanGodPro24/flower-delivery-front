import { RootState } from "../store.types";

export const selectFlowers = (state: RootState) => state.flowers.items;

export const selectLoading = (state: RootState) => state.flowers.loading;

export const selectError = (state: RootState) => state.flowers.error;
