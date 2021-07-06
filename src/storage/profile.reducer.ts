import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchPrivateProfile,
  followProfile,
  unFollowProfile,
} from "../screens/profile/profile.request";
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

export const followPublicProfile = createAsyncThunk(
  "profile/followProfile",
  async (payload: any) => {
    const profile = await followProfile(payload.id)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return profile;
  }
);

export const unFollowPublicProfile = createAsyncThunk(
  "profile/unFollowProfile",
  async (payload: any) => {
    const profile = await unFollowProfile(payload.id)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return profile;
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    loginRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    fetchProfileRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    followProfileRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    unFollowProfileRequestStatus: {
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

      state.fetchProfileRequestStatus.loading = false;
      state.fetchProfileRequestStatus.error = false;
      state.fetchProfileRequestStatus.success = false;

      state.followProfileRequestStatus.loading = false;
      state.followProfileRequestStatus.error = false;
      state.followProfileRequestStatus.success = false;

      state.unFollowProfileRequestStatus.loading = false;
      state.unFollowProfileRequestStatus.error = false;
      state.unFollowProfileRequestStatus.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(followPublicProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.followProfileRequestStatus.loading = false;
          state.followProfileRequestStatus.error = false;
          state.followProfileRequestStatus.success = true;
        }
      })
      .addCase(followPublicProfile.pending, (state, action) => {
        state.followProfileRequestStatus.loading = true;
      })
      .addCase(followPublicProfile.rejected, (state, action) => {
        state.followProfileRequestStatus.loading = false;
        state.followProfileRequestStatus.success = false;
        state.followProfileRequestStatus.error = true;
      });

    builder
      .addCase(unFollowPublicProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.unFollowProfileRequestStatus.loading = false;
          state.unFollowProfileRequestStatus.error = false;
          state.unFollowProfileRequestStatus.success = true;
        }
      })
      .addCase(unFollowPublicProfile.pending, (state, action) => {
        state.unFollowProfileRequestStatus.loading = true;
      })
      .addCase(unFollowPublicProfile.rejected, (state, action) => {
        state.unFollowProfileRequestStatus.loading = false;
        state.unFollowProfileRequestStatus.success = false;
        state.unFollowProfileRequestStatus.error = true;
      });

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
        state.fetchProfileRequestStatus.loading = false;
        state.fetchProfileRequestStatus.error = false;
        state.fetchProfileRequestStatus.success = true;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.fetchProfileRequestStatus.loading = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.fetchProfileRequestStatus.loading = false;
        state.fetchProfileRequestStatus.success = false;
        state.fetchProfileRequestStatus.error = true;
      });
  },
});

export const { clearProfile } = ProfileSlice.actions;

export type ProfileState = ReturnType<typeof ProfileSlice.reducer>;
