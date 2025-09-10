import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Shop } from "./shops.types";

export const getAllShops = createAsyncThunk<
  Shop[],
  void,
  { rejectValue: string }
>("shops/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/shops");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});
