import axios from "axios";

const protocol = process.env.HTTPS_PROTOCOL ? "https" : "https";

//axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: `${protocol}://${process.env.URL}:443`,
});

//axios.get('some api url', {withCredentials: true});
export const get = async (url: string, args?: any) => {
  return client
    .get(url, {
      ...args,
    })
    .catch((error) => {
      throw error;
    });
};

export const post = async (url: string, body?: any, args?: any) => {
  return client
    .post(url, body, {
      ...args,
    })
    .catch((error) => {
      throw error;
    });
};

export const Delete = async (url: string, args?: any) => {
  return client
    .delete(url, {
      ...args,
    })
    .catch((error) => {
      throw error;
    });
};
