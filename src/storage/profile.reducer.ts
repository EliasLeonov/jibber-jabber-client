import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  //const profile = await fetchPrivateProfile()
  // .then((res) => res.data)
  // .catch((error) => console.error(error));
  return {
    id: "123455",
    username: "bauti",
    firstname: "bauti",
    lastname: "baiocchi",
    mail: "b@b.com",
  };
});

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    loginRequestStatus: {
      loading: false,
      succes: false,
      error: false,
    },
    fetchPofileRequestStatus: {
      loading: false,
      succes: false,
      error: false,
    },
    profile: undefined,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = undefined;
      state.loginRequestStatus.loading = false;
      state.loginRequestStatus.error = false;
      state.loginRequestStatus.succes = false;
      state.fetchPofileRequestStatus.loading = false;
      state.fetchPofileRequestStatus.error = false;
      state.fetchPofileRequestStatus.succes = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.loginRequestStatus.loading = false;
          state.loginRequestStatus.error = false;
          state.loginRequestStatus.succes = true;
        } else {
          state.loginRequestStatus.loading = false;
          state.loginRequestStatus.error = true;
          state.loginRequestStatus.succes = false;
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loginRequestStatus.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequestStatus.loading = false;
        state.loginRequestStatus.succes = false;
        state.loginRequestStatus.error = true;
      });

    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.fetchPofileRequestStatus.loading = false;
        state.fetchPofileRequestStatus.error = false;
        state.fetchPofileRequestStatus.succes = true;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.fetchPofileRequestStatus.loading = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.fetchPofileRequestStatus.loading = false;
        state.fetchPofileRequestStatus.succes = false;
        state.fetchPofileRequestStatus.error = true;
      });
  },
});

export const { clearProfile } = ProfileSlice.actions;

export type ProfileState = ReturnType<typeof ProfileSlice.reducer>;
