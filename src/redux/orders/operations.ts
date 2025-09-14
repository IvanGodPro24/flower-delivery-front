import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FinalizeOrder,
  GetHistory,
  Order,
  OrderItem,
  UpdateOrderItem,
} from "./orders.types";

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

export const getCart = createAsyncThunk<Order[], void, { rejectValue: string }>(
  "orders/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/orders/cart");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const getHistory = createAsyncThunk<
  Order[],
  GetHistory,
  { rejectValue: string }
>("orders/getHistory", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("/orders/history", payload);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const getOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/getById", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/orders/${orderId}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const addToCart = createAsyncThunk<
  Order,
  { flowerId: string; quantity?: number },
  { rejectValue: string }
>(
  "orders/addToCart",
  async ({ flowerId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/orders/cart", { flowerId, quantity });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/orders/${id}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const deleteOrderItem = createAsyncThunk<
  Order,
  OrderItem,
  { rejectValue: string }
>(
  "orders/deleteOrderItem",
  async ({ orderId, flowerId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/orders/${orderId}/items/${flowerId}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const updateOrderItem = createAsyncThunk<
  Order,
  UpdateOrderItem,
  { rejectValue: string }
>(
  "orders/updateOrderItem",
  async ({ orderId, flowerId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/orders/${orderId}/items/${flowerId}`,
        { quantity }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const finalizeOrder = createAsyncThunk<
  Order,
  FinalizeOrder,
  { rejectValue: string }
>(
  "orders/finalizeOrder",
  async ({ orderId, name, email, phone, address }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/orders/${orderId}/finalize`, {
        name,
        email,
        phone,
        address,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);
