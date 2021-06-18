import { post } from "../../utils/HttpClient";

export const register = ({ username, password, mail, name, lastname }) =>
  post("/auth/user/register", {
    username,
    password,
    mail,
    name,
    lastname,
  });
