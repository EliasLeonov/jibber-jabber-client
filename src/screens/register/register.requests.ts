import { post } from "../../utils/HttpClient";

export const register = ({ username, password, mail, name, lastname }) =>
  post("http://localhost:9000/user/register", {
    username,
    password,
    mail,
    name,
    lastname,
  });
