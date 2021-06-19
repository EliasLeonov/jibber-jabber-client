import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "../screens/users/users.request";

export const search = createAsyncThunk("users/search", async (payload: any) => {
  const user = await searchUsers(payload.username).then((res) => res.data);
  if (user) {
    return [user];
  }
  return [];
});

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    searchRequestStatus: {
      loading: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.searchRequestStatus.loading = false;
      state.searchRequestStatus.error = false;
      state.searchRequestStatus.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.rejected, (state, action) => {
        state.searchRequestStatus.error = true;
        state.searchRequestStatus.loading = false;
        state.searchRequestStatus.success = false;
        state.users = [];
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searchRequestStatus.loading = false;
        state.searchRequestStatus.success = true;
        state.users = action.payload;
      })
      .addCase(search.pending, (state, action) => {
        state.searchRequestStatus.loading = true;
      });
  },
});

export const { clearUsers } = UsersSlice.actions;

export type UsersState = ReturnType<typeof UsersSlice.reducer>;
