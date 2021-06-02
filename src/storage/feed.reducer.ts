import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFeed: AsyncThunk<any, any, any> = createAsyncThunk(
  "feed/fetch",
  async (payload: any) => {
    return null;
  }
);

export const FeedSlice = createSlice({
  name: "feed",
  initialState: {
    loading: false,
    succes: false,
    error: false,
    feed: [],
  },
  reducers: {
    favoritePost: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = true;
    });
    builder.addCase(fetchFeed.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFeed.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export type FeedState = ReturnType<typeof FeedSlice.reducer>;
