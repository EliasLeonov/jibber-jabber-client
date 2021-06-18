import { get } from "../../utils/HttpClient";

export const fetchPrivateProfile = async () =>
  get("/api/user-info/private-profile");

export const fetchPublicProfile = async (username: string) =>
  get(`/api/user-info/public-profile/${username}`);
