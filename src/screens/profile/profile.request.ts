import { get } from "../../utils/HttpClient";

export const fetchPrivateProfile = async () =>
  get("http://localhost:9001/user-info/private-profile", {
    withCredentials: true,
  });
