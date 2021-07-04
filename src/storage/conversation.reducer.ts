import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllChats, getChatMessages } from "../screens/chats/chat.requests";

export const fetchAllChats = createAsyncThunk(
  "chats/fetchAllChats",
  async (payload: any) => {
    const chats = await getAllChats(payload.userId)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (chats) {
      return { chats };
    }
    return { chats: [] };
  }
);

export const fetchMessages = createAsyncThunk(
  "chats/fetchMessages",
  async (payload: any) => {
    const messages = await getChatMessages(payload.userId, payload.recipientId)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (messages) {
      return { messages };
    }
    return { messages: [] };
  }
);

export const ConversationSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    messages: [],
    fetchMessagesRequestStatus: {
      loading: false,
      success: true,
      error: false,
    },
    fetchChatsRequestStatus: {
      loading: false,
      success: true,
      error: false,
    },
    connected: false,
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload.connected;
    },
    messageReceived: (state, action) => {
      if (action.payload.message) {
        if (
          !state.messages.includes((m) => m.id === action.payload.message.id)
        ) {
          state.messages.push(action.payload.message);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.fetchMessagesRequestStatus.loading = false;
        state.fetchMessagesRequestStatus.success = true;
        state.fetchMessagesRequestStatus.error = false;

        if (action.payload.messages.length > 0) {
          state.messages.push(...action.payload.messages);
        }
      })
      .addCase(fetchMessages.pending, (state, action) => {
        state.fetchMessagesRequestStatus.loading = true;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.fetchMessagesRequestStatus.loading = false;
        state.fetchMessagesRequestStatus.success = true;
        state.fetchMessagesRequestStatus.error = true;
      });

    builder
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.fetchChatsRequestStatus.loading = false;
        state.fetchChatsRequestStatus.success = true;
        state.fetchChatsRequestStatus.error = false;

        console.log(action.payload);
        if (action.payload.chats.length > 0) {
          state.chats = action.payload.chats;
        }
      })
      .addCase(fetchAllChats.pending, (state, action) => {
        state.fetchChatsRequestStatus.loading = true;
      })
      .addCase(fetchAllChats.rejected, (state, action) => {
        state.fetchChatsRequestStatus.loading = false;
        state.fetchChatsRequestStatus.success = true;
        state.fetchChatsRequestStatus.error = true;
      });
  },
});

export const { setConnected, messageReceived } = ConversationSlice.actions;

export type ConversationState = ReturnType<typeof ConversationSlice.reducer>;
