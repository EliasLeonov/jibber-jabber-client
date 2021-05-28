import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../screens/signin/signin.request";

export const signInUser: AsyncThunk<any, any, any> = createAsyncThunk(
  "signIn/signInUser",
  async (payload: any) => {
    const response = await signIn(payload.mail, payload.password)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return response;
  }
);

export const SignInSlice = createSlice({
  name: "signIn",
  initialState: {
    loading: false,
    response: {},
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(signInUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export type SignInState = ReturnType<typeof SignInSlice.reducer>;
