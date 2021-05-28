import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../screens/register/register.requests";

export const registerUser: AsyncThunk<any, any, any> = createAsyncThunk(
  "register/registerUser",
  async (payload: any) => {
    const response = await register(payload);
    return response.data;
  }
);

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
  },
});

export type RegisterState = ReturnType<typeof RegisterSlice.reducer>;
