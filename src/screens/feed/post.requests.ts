import { get, post } from "../../utils/HttpClient";

export const createNewPost = (text: string) => post("/api/post/save", { text });

export const fetchFeed = () => get("/api/post/get-feed");

export const likePost = (userId: string, postId: string) =>
  post("/api/like", { userId, postId });
