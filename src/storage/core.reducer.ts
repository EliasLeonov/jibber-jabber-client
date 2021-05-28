import { createSlice } from "@reduxjs/toolkit";

export const CoreSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
  },
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { storeToken, clearToken } = CoreSlice.actions;

export type CoreState = ReturnType<typeof CoreSlice.reducer>;
