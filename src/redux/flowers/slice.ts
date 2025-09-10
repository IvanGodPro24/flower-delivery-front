import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./flowers.types";
import { getAllFlowers } from "./operations";

export const handlePending = (state: State) => {
  state.loading = true;
};

export const handleRejected = (state: State, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState: State = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "flowers",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getAllFlowers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("rejected");
      }, handleRejected)

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("pending");
      }, handlePending),
});

export default slice.reducer;
