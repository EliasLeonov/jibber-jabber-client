const axios = require("axios").default;

export const signIn = (mail: string, password: string) =>
  axios({
    method: "post",
    url: "http://localhost:9000/user/login",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: { mail, password },
  });
