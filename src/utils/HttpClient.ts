import axios from "axios";

const client = axios.create();

//axios.get('some api url', {withCredentials: true});
export const get = async (url: string, args?: any) => {
  return client
    .get(url, {
      ...args,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      throw error;
    });
};

export const post = async (url: string, body: any, args?: any) => {
  return client
    .post(url, body, {
      ...args,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      throw error;
    });
};
