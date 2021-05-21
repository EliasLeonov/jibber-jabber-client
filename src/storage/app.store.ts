import { configureStore } from "@reduxjs/toolkit";
import { RegisterSlice } from "./register.reducer";
import { SignInSlice } from "./signin.reducer";

const store = configureStore({
  reducer: {
    signIn: SignInSlice.reducer,
    register: RegisterSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
