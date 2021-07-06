import { Delete, get, post } from "../../utils/HttpClient";

export const fetchPrivateProfile = async () =>
  get("/api/user-info/private-profile");

export const fetchPublicProfile = async (username: string) =>
  get(`/api/user-info/public-profile/${username}`);

export const followProfile = async (followingUserId: number) =>
  post(`/api/follow/follow/${followingUserId}`);

export const unFollowProfile = async (followingUserId: number) =>
  Delete(`/api/follow/unfollow/${followingUserId}`);

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => post("/auth/user/change-pass", { oldPassword, newPassword });

export const isFollowingProfile = async (userId: string) =>
  get(`/api/follow/is-following/${userId}`);
