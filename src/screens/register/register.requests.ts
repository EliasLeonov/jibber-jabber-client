const axios = require("axios").default;

export const register = ({ username, password, mail, name, lastname }) =>
  axios({
    method: "post",
    url: "http://localhost:9000/user/register",
    haders: { "Content-Type": "application/json" },
    data: { username, password, mail, name, lastname },
  });
