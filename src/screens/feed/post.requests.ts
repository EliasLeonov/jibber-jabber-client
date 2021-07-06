import { Delete, get, post } from "../../utils/HttpClient";

export const createNewPost = (text: string) => post("/api/post/save", { text });

export const fetchFeed = () => get("/api/post/get-feed");

export const unlikePost = (postId: string) => Delete(`/api/like/${postId}`);

export const likePost = (userId: string, postId: string) =>
  post("/api/like", { userId, postId });

export const deletePost = (postId: string) =>
  Delete(`/api/post/delete/${postId}`);
