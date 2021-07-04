import { get } from "../../utils/HttpClient";

export const getChatMessages = (userId: string, recipientId: string) =>
  get(`/chat-api/messages/${userId}/${recipientId}`);

export const getAllChats = (userId: string) => get(`/chat-api/all/${userId}`);
