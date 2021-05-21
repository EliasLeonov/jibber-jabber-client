const axios = require("axios").default;

export const register = ({ username, password, mail, name, lastname }) =>
  axios({
    method: "post",
    url: "http://localhost:8080/user/save",
    data: { username, password, mail, name, lastname },
  });
