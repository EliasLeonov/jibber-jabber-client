import { get } from "../../utils/HttpClient";

export const searchUsers = (username: string) =>
  get(`/api/user-info/user/${username}`);
