import { configureStore } from "@reduxjs/toolkit";
import { CoreSlice } from "./core.reducer";
import { RegisterSlice } from "./register.reducer";
import { SignInSlice } from "./signin.reducer";

const store = configureStore({
  reducer: {
    signIn: SignInSlice.reducer,
    register: RegisterSlice.reducer,
    core: CoreSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
