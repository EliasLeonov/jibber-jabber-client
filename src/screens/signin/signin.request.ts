const axios = require("axios").default;

export const signIn = (username: string, password: string) =>
  axios({
    method: "post",
    url: "http://localhost:9000/login",
    data: { username, password },
  });
