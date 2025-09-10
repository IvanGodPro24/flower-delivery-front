import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Flower } from "./flowers.types";

axios.defaults.baseURL = "http://localhost:3000";

export const getAllFlowers = createAsyncThunk<
  Flower[],
  void,
  { rejectValue: string }
>("flowers/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/flowers");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});
