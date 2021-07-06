import { get } from "../../utils/HttpClient";

export const searchUsers = (username: string) =>
  get(`/api/user-info/user/${username}`);

export const getUser = (userId: number) =>
  get(`/api/user-info/user/by-id/${userId}`);
