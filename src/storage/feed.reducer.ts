import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "../models/post";
import { createNewPost } from "../screens/feed/post.requests";

export const fetchFeed: AsyncThunk<any, any, any> = createAsyncThunk(
  "feed/fetch",
  async (payload: any) => {
    return null;
  }
);

export const createPost: AsyncThunk<any, any, any> = createAsyncThunk(
  "feed/createPost",
  async (payload: any) => {
    const post: Post = await createNewPost(payload.username, payload.text)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return post;
  }
);

export const FeedSlice = createSlice({
  name: "feed",
  initialState: {
    loadingFeed: false,
    loadingFeedSucces: false,
    loadingFeedError: false,
    loadingPostCreation: false,
    loadingPostCreationSucces: false,
    loadingPostCreationError: false,
    feed: [],
  },
  reducers: {
    favoritePost: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loadingFeed = false;
        state.loadingFeedSucces = true;
      })
      .addCase(fetchFeed.pending, (state, action) => {
        state.loadingFeed = true;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loadingFeed = false;
        state.loadingFeedError = true;
      });

    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.loadingPostCreationSucces = true;
        state.loadingPostCreation = false;
        state.feed.push(action.payload.post);
      })
      .addCase(createPost.pending, (state, action) => {
        state.loadingPostCreation = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loadingPostCreation = false;
        state.loadingPostCreationError = true;
      });
  },
});

export type FeedState = ReturnType<typeof FeedSlice.reducer>;
