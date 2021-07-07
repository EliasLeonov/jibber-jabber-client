import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ConversationSlice } from "./conversation.reducer";
import { CoreSlice } from "./core.reducer";
import { FeedSlice } from "./feed.reducer";
import { ProfileSlice } from "./profile.reducer";
import { RegisterSlice } from "./register.reducer";
import { UsersSlice } from "./users.reducer";

const feedConfig = {
  key: "feed",
  storage: storage,
};

const registerConfig = {
  key: "register",
  storage: storage,
};

const usersConfig = {
  key: "users",
  storage: storage,
};

const chatConfig = {
  key: "chats",
  storage: storage,
};

const profileConfig = {
  key: "profile",
  storage: storage,
};

const rootReducer = combineReducers({
  register: RegisterSlice.reducer,
  core: CoreSlice.reducer,
  feed: FeedSlice.reducer,
  conversation: persistReducer(chatConfig, ConversationSlice.reducer),
  profile: persistReducer(profileConfig, ProfileSlice.reducer),
  users: UsersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
