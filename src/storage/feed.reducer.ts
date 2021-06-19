import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "../models/post";
import { createNewPost, fetchFeed } from "../screens/feed/post.requests";

export const fetchPosts = createAsyncThunk("feed/posts", async () => {
  const feed: [] = await fetchFeed().then((res) => res.data);
  return feed;
});

export const createPost = createAsyncThunk(
  "feed/createPost",
  async (payload: any) => {
    const post: Post = await createNewPost(payload.text)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return post;
  }
);

export const FeedSlice = createSlice({
  name: "feed",
  initialState: {
    fetchPostsRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    postCreationRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    posts: [],
  },
  reducers: {
    clearFeed: (state) => {
      state.posts = [];
      state.fetchPostsRequestStatus.loading = false;
      state.fetchPostsRequestStatus.error = false;
      state.fetchPostsRequestStatus.success = false;
      state.postCreationRequestStatus.loading = false;
      state.postCreationRequestStatus.error = false;
      state.postCreationRequestStatus.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsRequestStatus.error = true;
        state.fetchPostsRequestStatus.loading = false;
        state.fetchPostsRequestStatus.success = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPostsRequestStatus.loading = false;
        state.fetchPostsRequestStatus.success = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.fetchPostsRequestStatus.loading = true;
      });

    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.postCreationRequestStatus.success = true;
        state.postCreationRequestStatus.loading = false;
        state.postCreationRequestStatus.error = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.pending, (state, action) => {
        state.postCreationRequestStatus.loading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postCreationRequestStatus.success = false;
        state.postCreationRequestStatus.loading = false;
        state.postCreationRequestStatus.error = true;
      });
  },
});

export const { clearFeed } = FeedSlice.actions;

export type FeedState = ReturnType<typeof FeedSlice.reducer>;
