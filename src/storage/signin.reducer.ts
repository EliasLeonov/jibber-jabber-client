import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../screens/signin/signin.request";

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

const signInUser = createAsyncThunk("user/signIn", async () => {
  const response = await signIn("bauti", "pass");
});

export const { startLoading, stopLoading } = SignInSlice.actions;

export type SignInState = ReturnType<typeof SignInSlice.reducer>;
