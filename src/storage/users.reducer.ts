import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const search = createAsyncThunk("users/search", async () => {
  const users: [] = [];
  return users;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(search.rejected, (state, action) => {
        state.searchRequestStatus.error = true;
        state.searchRequestStatus.loading = false;
        state.searchRequestStatus.success = false;
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

export type UsersState = ReturnType<typeof UsersSlice.reducer>;
