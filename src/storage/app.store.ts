import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ConversationSlice } from "./conversation.reducer";
import { CoreSlice } from "./core.reducer";
import { FeedSlice } from "./feed.reducer";
import { RegisterSlice } from "./register.reducer";
import { SignInSlice } from "./signin.reducer";

const rootReducer = combineReducers({
  signIn: SignInSlice.reducer,
  register: RegisterSlice.reducer,
  core: CoreSlice.reducer,
  feed: FeedSlice.reducer,
  conversation: ConversationSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
