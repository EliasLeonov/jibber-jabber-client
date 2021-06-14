import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "../models/post";
import { createNewPost } from "../screens/feed/post.requests";

const moment = require("moment");

export const fetchPosts = createAsyncThunk("feed/posts", () => {
  return [
    {
      id: "1",
      author: {
        id: "123",
        username: "Pablo",
      },
      text: "$BTC to the moon!!!!",
      timestamp: moment().format("LTS"),
    },
    {
      id: "2",
      author: {
        id: "2",
        username: "Bauti",
      },
      text: "insert elon musk meme",
      timestamp: moment().format("LTS"),
    },
    {
      id: "3",
      author: {
        id: "1",
        username: "Pablo",
      },
      text: "yes sir..",
      timestamp: moment().format("LTS"),
    },
  ];
});

export const createPost = createAsyncThunk(
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
    fetchPostsRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    loadingPostCreation: false,
    loadingPostCreationSucces: false,
    loadingPostCreationError: false,
    posts: [],
  },
  reducers: {
    favoritePost: (state, action) => {},
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
      });
    //.addCase(fetchPosts.pending, (state, action) => {
    // state.fetchPostsRequestStatus.loading = true;
    // })

    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.loadingPostCreationSucces = true;
        state.loadingPostCreation = false;
        state.posts.push(action.payload);
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
