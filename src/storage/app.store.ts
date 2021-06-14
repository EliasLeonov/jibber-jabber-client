import { configureStore } from "@reduxjs/toolkit";
import { ConversationSlice } from "./conversation.reducer";
import { CoreSlice } from "./core.reducer";
import { FeedSlice } from "./feed.reducer";
import { RegisterSlice } from "./register.reducer";
import { SignInSlice } from "./signin.reducer";

const store = configureStore({
  reducer: {
    signIn: SignInSlice.reducer,
    register: RegisterSlice.reducer,
    core: CoreSlice.reducer,
    feed: FeedSlice.reducer,
    conversation: ConversationSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
