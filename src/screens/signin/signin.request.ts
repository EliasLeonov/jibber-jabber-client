import { post } from "../../utils/HttpClient";

export const login = (username: string, password: string) =>
  post("/auth/user/login", { username, password });
