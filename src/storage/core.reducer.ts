import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const CoreSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
  },
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload.token;
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
    },
    clearToken: (state) => {
      state.token = "";
      axios.defaults.headers.common["Authorization"] = "";
    },
  },
});

export const { storeToken, clearToken } = CoreSlice.actions;

export type CoreState = ReturnType<typeof CoreSlice.reducer>;
