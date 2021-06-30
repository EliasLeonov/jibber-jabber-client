import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "../models/post";
import {
  createNewPost,
  deletePost,
  fetchFeed,
  likePost,
  unlikePost,
} from "../screens/feed/post.requests";

export const likeUserPost = createAsyncThunk(
  "feed/likePost",
  async (payload: any) => {
    const liked = await likePost(payload.userId, payload.postId)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return { liked: !!liked, postId: payload.postId };
  }
);

export const unLikeUserPost = createAsyncThunk(
  "feed/unLikePost",
  async (payload: any) => {
    const unliked: boolean = await unlikePost(payload.postId)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return { unliked, postId: payload.postId };
  }
);

export const unlikeUserPost = createAsyncThunk(
  "feed/unlikePost",
  async (payload: any) => {
    const deleted: boolean = await deletePost(payload.postId)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return { deleted, postId: payload.postId };
  }
);

export const fetchPosts = createAsyncThunk("feed/posts", async () => {
  const feed: [] = await fetchFeed().then((res) => res.data);
  return feed;
});

export const deleteUserPost = createAsyncThunk(
  "feed/deletePost",
  async (payload: any) => {
    const deleted: boolean = await deletePost(payload.postId)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return { deleted, postId: payload.postId };
  }
);

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
    postDeletionRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    postLikeRequestStatus: {
      loading: false,
      success: false,
      error: false,
    },
    postUnLikeRequestStatus: {
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

      state.postDeletionRequestStatus.loading = false;
      state.postDeletionRequestStatus.error = false;
      state.postDeletionRequestStatus.success = false;

      state.postLikeRequestStatus.loading = false;
      state.postLikeRequestStatus.error = false;
      state.postLikeRequestStatus.success = false;

      state.postUnLikeRequestStatus.loading = false;
      state.postUnLikeRequestStatus.error = false;
      state.postUnLikeRequestStatus.success = false;
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
        state.posts = action.payload.sort((a, b) => {
          //@ts-ignore
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.fetchPostsRequestStatus.loading = true;
      });

    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.postCreationRequestStatus.success = true;
        state.postCreationRequestStatus.loading = false;
        state.postCreationRequestStatus.error = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.pending, (state, action) => {
        state.postCreationRequestStatus.loading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postCreationRequestStatus.success = false;
        state.postCreationRequestStatus.loading = false;
        state.postCreationRequestStatus.error = true;
      });

    builder
      .addCase(deleteUserPost.fulfilled, (state, action) => {
        state.postDeletionRequestStatus.success = true;
        state.postDeletionRequestStatus.loading = false;
        state.postDeletionRequestStatus.error = false;
        if (action.payload.deleted) {
          state.posts = state.posts.filter(
            (p) => p.id !== action.payload.postId
          );
        }
      })
      .addCase(deleteUserPost.pending, (state, action) => {
        state.postDeletionRequestStatus.loading = true;
      })
      .addCase(deleteUserPost.rejected, (state, action) => {
        state.postDeletionRequestStatus.success = false;
        state.postDeletionRequestStatus.loading = false;
        state.postDeletionRequestStatus.error = true;
      });

    builder
      .addCase(likeUserPost.fulfilled, (state, action) => {
        state.postLikeRequestStatus.success = true;
        state.postLikeRequestStatus.loading = false;
        state.postLikeRequestStatus.error = false;
        if (action.payload.liked) {
          state.posts = state.posts.map((p) => {
            if (p.id === action.payload.postId) {
              p.isLiked = true;
            }
            return p;
          });
        }
      })
      .addCase(likeUserPost.pending, (state, action) => {
        state.postLikeRequestStatus.loading = true;
      })
      .addCase(likeUserPost.rejected, (state, action) => {
        state.postLikeRequestStatus.success = false;
        state.postLikeRequestStatus.loading = false;
        state.postLikeRequestStatus.error = true;
      });

    builder
      .addCase(unLikeUserPost.fulfilled, (state, action) => {
        state.postUnLikeRequestStatus.success = true;
        state.postUnLikeRequestStatus.loading = false;
        state.postUnLikeRequestStatus.error = false;
        if (action.payload.unliked) {
          state.posts = state.posts.map((p) => {
            if (p.id === action.payload.postId) {
              p.isLiked = false;
            }
            return p;
          });
        }
      })
      .addCase(unLikeUserPost.pending, (state, action) => {
        state.postUnLikeRequestStatus.loading = true;
      })
      .addCase(unLikeUserPost.rejected, (state, action) => {
        state.postUnLikeRequestStatus.success = false;
        state.postUnLikeRequestStatus.loading = false;
        state.postUnLikeRequestStatus.error = true;
      });
  },
});

export const { clearFeed } = FeedSlice.actions;

export type FeedState = ReturnType<typeof FeedSlice.reducer>;
