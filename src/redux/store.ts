import { configureStore } from "@reduxjs/toolkit";
import flowerReducer from "./flowers/slice";

export const store = configureStore({
  reducer: {
    flowers: flowerReducer,
  },
});
