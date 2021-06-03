const axios = require("axios").default;

export const createNewPost = (username: string, text: string) =>
  axios({
    method: "post",
    url: "http://localhost:9001/post/save",
    haders: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: { username, text },
  });
