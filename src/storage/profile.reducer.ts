import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../screens/signin/signin.request";

export const signInUser = createAsyncThunk(
  "profile/signIn",
  async (payload: any) => {
    const response = await signIn(payload.mail, payload.password)
      .then((res) => {
        return {
          id: "123456",
          username: "Bauti",
          mail: "b@b.com",
          firstName: "Bauti",
          lastName: "Baiocchi",
        };
      })
      .catch((error) => console.error(error));
    return response;
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    signInRequestStatus: {
      loading: false,
      succes: false,
      error: false,
    },
    profile: undefined,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = undefined;
      state.signInRequestStatus.loading = false;
      state.signInRequestStatus.error = false;
      state.signInRequestStatus.succes = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.signInRequestStatus.loading = false;
        state.signInRequestStatus.error = false;
        state.signInRequestStatus.succes = true;
        state.profile = action.payload;
      })
      .addCase(signInUser.pending, (state, action) => {
        state.signInRequestStatus.loading = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInRequestStatus.loading = false;
        state.signInRequestStatus.succes = false;
        state.signInRequestStatus.error = true;
      });
  },
});

export const { clearProfile } = ProfileSlice.actions;

export type ProfileState = ReturnType<typeof ProfileSlice.reducer>;
