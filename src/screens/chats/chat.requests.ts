import { get } from "../../utils/HttpClient";

export const getChatMessages = (userId: string, recipientId: string) =>
  get(`/chat/chat-api/messages/${userId}/${recipientId}`);

export const getAllChats = (userId: string) =>
  get(`/chat/chat-api/all/${userId}`);
