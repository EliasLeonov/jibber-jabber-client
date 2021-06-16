import { createSlice } from "@reduxjs/toolkit";

export const CoreSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
  },
  reducers: {},
});

export type CoreState = ReturnType<typeof CoreSlice.reducer>;
