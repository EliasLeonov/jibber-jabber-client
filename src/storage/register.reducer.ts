import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../screens/register/register.requests";

export const registerUser: AsyncThunk<any, any, any> = createAsyncThunk(
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
    succes: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = true;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export type RegisterState = ReturnType<typeof RegisterSlice.reducer>;
