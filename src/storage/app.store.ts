import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ConversationSlice } from "./conversation.reducer";
import { CoreSlice } from "./core.reducer";
import { FeedSlice } from "./feed.reducer";
import { RegisterSlice } from "./register.reducer";
import { SignInSlice } from "./signin.reducer";

const feedConfig = {
  key: "feed",
  storage: storage,
};

const registerConfig = {
  key: "register",
  storage: storage,
};

const signInConfig = {
  key: "signIn",
  storage: storage,
};

const rootReducer = combineReducers({
  signIn: persistReducer(signInConfig, SignInSlice.reducer),
  register: persistReducer(registerConfig, RegisterSlice.reducer),
  core: CoreSlice.reducer,
  feed: persistReducer(feedConfig, FeedSlice.reducer),
  conversation: ConversationSlice.reducer,
});

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["feed", "register", "signIn"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
