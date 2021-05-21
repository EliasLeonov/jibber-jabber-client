import { createSlice } from "@reduxjs/toolkit";

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = RegisterSlice.actions;

export type RegisterState = ReturnType<typeof RegisterSlice.reducer>;
