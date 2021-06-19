import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPrivateProfile } from "../screens/profile/profile.request";
import { login } from "../screens/signin/signin.request";

export const loginUser = createAsyncThunk(
  "profile/login",
  async (payload: any) => {
    const response = await login(payload.username, payload.password)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return response;
  }
);

export const fetchProfile = createAsyncThunk("profile/fetch", async () => {
  const profile = await fetchPrivateProfile()
    .then((res) => res.data)
    .catch((error) => console.error(error));
  return profile;
});

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    loginRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    fetchPofileRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    profile: undefined,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = undefined;
      state.loginRequestStatus.loading = false;
      state.loginRequestStatus.error = false;
      state.loginRequestStatus.success = false;
      state.fetchPofileRequestStatus.loading = false;
      state.fetchPofileRequestStatus.error = false;
      state.fetchPofileRequestStatus.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.loginRequestStatus.loading = false;
          state.loginRequestStatus.error = false;
          state.loginRequestStatus.success = true;
        } else {
          state.loginRequestStatus.loading = false;
          state.loginRequestStatus.error = true;
          state.loginRequestStatus.success = false;
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loginRequestStatus.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequestStatus.loading = false;
        state.loginRequestStatus.success = false;
        state.loginRequestStatus.error = true;
      });

    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.fetchPofileRequestStatus.loading = false;
        state.fetchPofileRequestStatus.error = false;
        state.fetchPofileRequestStatus.success = true;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.fetchPofileRequestStatus.loading = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.fetchPofileRequestStatus.loading = false;
        state.fetchPofileRequestStatus.success = false;
        state.fetchPofileRequestStatus.error = true;
      });
  },
});

export const { clearProfile } = ProfileSlice.actions;

export type ProfileState = ReturnType<typeof ProfileSlice.reducer>;
