import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../screens/register/register.requests";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (payload: any) => {
    const response = await register(payload)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return response;
  }
);

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const { reset } = RegisterSlice.actions;

export type RegisterState = ReturnType<typeof RegisterSlice.reducer>;
