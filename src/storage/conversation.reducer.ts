import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAll = createAsyncThunk("conversation/fetchAll", async () => {
  return [
    {
      id: 1,
      authorId: "123",
      username: "PabloRocks123",
      firstName: "Pablo",
      lastMessage: "Yo when are we leaving?",
    },
    {
      id: 2,
      authorId: "858585",
      username: "BigManlo",
      firstName: "Biggie",
      lastMessage: "BTC is going to the moon, you know it, i know it.",
    },
  ];
});

export const ConversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    conversationsRequestStatus: {
      loading: false,
      loadingSuccess: true,
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.conversationsRequestStatus.loading = false;
        state.conversationsRequestStatus.loadingSuccess = true;
      })
      .addCase(fetchAll.pending, (state, action) => {
        state.conversationsRequestStatus.loading = true;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.conversationsRequestStatus.loading = false;
        state.conversationsRequestStatus.loadingSuccess = true;
        state.conversationsRequestStatus.error = true;
      });
  },
});

export type ConversationState = ReturnType<typeof ConversationSlice.reducer>;
