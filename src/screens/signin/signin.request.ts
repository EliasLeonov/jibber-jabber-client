import { post } from "../../utils/HttpClient";

export const login = (username: string, password: string) =>
  post("http://localhost:9000/user/login", { username, password });
