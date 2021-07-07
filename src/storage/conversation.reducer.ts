import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
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
      success: false,
      error: false,
    },
    fetchChatsRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    connected: false,
  },
  reducers: {
    clearConversations: (state) => {
      state.fetchChatsRequestStatus.loading = false;
      state.fetchChatsRequestStatus.error = false;
      state.fetchChatsRequestStatus.success = false;

      state.fetchMessagesRequestStatus.loading = false;
      state.fetchMessagesRequestStatus.error = false;
      state.fetchMessagesRequestStatus.success = false;

      state.connected = false;
      state.chats = [];
      state.messages = [];
    },
    setConnected: (state, action) => {
      state.connected = action.payload.connected;
    },
    messageReceived: (state, action) => {
      if (action.payload.notification) {
        state.messages = uniqBy(
          [...state.messages, action.payload.notification.message],
          "id"
        );

        state.chats = state.chats.map((c) => {
          if (c.chatId === action.payload.notification.message.chatId) {
            return {
              ...c,
              unreadCount: action.payload.notification.unreadCount,
            };
          }
          return c;
        });
      }
    },
    messageRead: (state, action) => {
      state.messages = state.messages.map((m) => {
        if (m.id === action.payload.message.id) {
          return { ...m, status: "READ" };
        }
        return m;
      });
    },
    markChatAsRead: (state, action) => {
      state.messages = state.messages.map((m) => {
        if (m.chatId === action.payload.chatId) {
          return { ...m, status: "READ" };
        }
        return m;
      });

      state.chats = state.chats.map((c) => {
        if (c.chatId === action.payload.chatId) {
          return { ...c, unreadCount: 0 };
        }
        return c;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.fetchMessagesRequestStatus.loading = false;
        state.fetchMessagesRequestStatus.success = true;
        state.fetchMessagesRequestStatus.error = false;

        if (action.payload.messages.length > 0) {
          state.messages = uniqBy(
            [...state.messages, ...action.payload.messages],
            "id"
          );
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

        if (action.payload.chats.length > 0) {
          state.chats = uniqBy(
            [...state.chats, ...action.payload.chats],
            "chatId"
          );
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

export const {
  setConnected,
  messageReceived,
  messageRead,
  clearConversations,
  markChatAsRead,
} = ConversationSlice.actions;

export type ConversationState = ReturnType<typeof ConversationSlice.reducer>;
