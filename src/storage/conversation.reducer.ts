import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAll = createAsyncThunk("conversation/fetchAll", async () => {
  return [
    {
      id: 1,
      username: "PabloRocks123",
      firstName: "Pablo",
      lastMessage: "Yo when are we leaving?",
    },
    {
      id: 2,
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
    loading: false,
    loadingSuccess: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
        state.loadingSuccess = true;
      })
      .addCase(fetchAll.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.loadingSuccess = true;
      });
  },
});

export type ConversationState = ReturnType<typeof ConversationSlice.reducer>;
