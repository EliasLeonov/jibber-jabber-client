import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { getUser, searchUsers } from "../screens/users/users.request";

export const search = createAsyncThunk("users/search", async (payload: any) => {
  const user = await searchUsers(payload.username).then((res) => res.data);
  if (user) {
    return [user];
  }
  return [];
});

export const getAllChatUsers = createAsyncThunk(
  "users/getAllChatUsers",
  async (payload: any) => {
    const users = await Promise.all(
      payload.chats
        .map((c) => c.receiverId)
        .map(async (id) => {
          let response = await getUser(id);
          return response.data;
        })
    );
    return users;
  }
);

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    searchRequestStatus: {
      loading: false,
      error: false,
      success: false,
    },
    getChatUsersRequestStatus: {
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
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searchRequestStatus.loading = false;
        state.searchRequestStatus.success = true;
        state.users = uniqBy([...state.users, ...action.payload], "id");
      })
      .addCase(search.pending, (state, action) => {
        state.searchRequestStatus.loading = true;
      });

    builder
      .addCase(getAllChatUsers.rejected, (state, action) => {
        state.getChatUsersRequestStatus.error = true;
        state.getChatUsersRequestStatus.loading = false;
        state.getChatUsersRequestStatus.success = false;
      })
      .addCase(getAllChatUsers.fulfilled, (state, action) => {
        state.getChatUsersRequestStatus.loading = false;
        state.getChatUsersRequestStatus.success = true;
        state.users = uniqBy([...state.users, ...action.payload], "id");
      })
      .addCase(getAllChatUsers.pending, (state, action) => {
        state.getChatUsersRequestStatus.loading = true;
      });
  },
});

export const { clearUsers } = UsersSlice.actions;

export type UsersState = ReturnType<typeof UsersSlice.reducer>;
