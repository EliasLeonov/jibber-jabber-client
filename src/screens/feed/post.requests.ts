const axios = require("axios").default;

export const createPost = ({ username, text }) =>
  axios({
    method: "post",
    url: "http://localhost:9001/post/save",
    haders: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: { username, text },
  });
