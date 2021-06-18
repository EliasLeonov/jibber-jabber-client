import { get } from "../../utils/HttpClient";

export const fetchPrivateProfile = async () =>
  get("/api/user-info/private-profile");
