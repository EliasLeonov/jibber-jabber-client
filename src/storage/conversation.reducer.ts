import { createSlice } from "@reduxjs/toolkit";

const Stomp = require("stompjs");
const SockJS = require("sockjs-client");

const socketClient = new SockJS("http://localhost:9002/ws");
const stompClient = Stomp.over(socketClient);

const onMessageReceived = (msg) => {
  console.log(msg);
};

const onError = (err) => {
  console.log("Failed to connect.");
  console.log(err);
};

const onConnected = (userId) => () => {
  console.log("Successfully connected.");
  stompClient.subscribe(
    "/user/" + userId + "/queue/messages",
    onMessageReceived
  );
};

export const ConversationSlice = createSlice({
  name: "conversation",
  initialState: {
    messages: [],
    connected: false,
  },
  reducers: {
    connect: (state, payload) => {
      //@ts-ignore
      stompClient.connect({}, onConnected(payload.userId), onError);
      state.connected = true;
    },
    sendMessage: (state, payload) => {
      //@ts-ignore
      if (payload.msg.trim() != "") {
        const message = {
          //@ts-ignore
          senderId: payload.senderId,
          //@ts-ignore
          receiverId: payload.receiverId,
          //@ts-ignore
          message: payload.msg.trim(),
        };

        stompClient.send("/app/chat", {}, JSON.stringify(message));
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { connect, sendMessage } = ConversationSlice.actions;

export type ConversationState = ReturnType<typeof ConversationSlice.reducer>;
