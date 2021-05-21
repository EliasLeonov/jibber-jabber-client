import { createSlice } from "@reduxjs/toolkit";

export const SignInSlice = createSlice({
  name: "signIn",
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

export const { startLoading, stopLoading } = SignInSlice.actions;

export type SignInState = ReturnType<typeof SignInSlice.reducer>;
