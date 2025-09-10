import { configureStore } from "@reduxjs/toolkit";
import flowerReducer from "./flowers/slice";
import shopReducer from "./shops/slice";
import orderReducer from "./orders/slice";

export const store = configureStore({
  reducer: {
    flowers: flowerReducer,
    shops: shopReducer,
    orders: orderReducer,
  },
});
