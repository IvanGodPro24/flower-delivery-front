import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlowersState } from "./flowers.types";
import { getAllFlowers } from "./operations";

const handlePending = (state: FlowersState) => {
  state.loading = true;
};

const handleRejected = (state: FlowersState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState: FlowersState = {
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
