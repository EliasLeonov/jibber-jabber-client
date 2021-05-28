import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../screens/signin/signin.request";

export const signInUser: AsyncThunk<any, any, any> = createAsyncThunk(
  "signIn/signInUser",
  async (payload: any) => {
    const response = await signIn(payload.mail, payload.password)
      .then((res) => res.data.token)
      .catch((error) => console.error(error));
    return response;
  }
);

export const SignInSlice = createSlice({
  name: "signIn",
  initialState: {
    loading: false,
    token: "",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export type SignInState = ReturnType<typeof SignInSlice.reducer>;
