import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "./orders.types";

export const getAllOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/orders");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});
