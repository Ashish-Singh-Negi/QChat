// @/services/contactService.ts
import axiosInstance from "@/utils/axiosinstance";
import { StoredMessage, UserInfo } from "@/Interface/definations";

interface ContactWithMessages extends UserInfo {
  messages: StoredMessage[];
}

export async function getContactInfo(
  contactId: string
): Promise<UserInfo | null> {
  if (!contactId) return null;

  try {
    const response = await axiosInstance.get<{ data: ContactWithMessages }>(
      `/friends/${contactId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      "getContactInfo error:",
      error?.response?.data?.error || error
    );
    return null;
  }
}

export async function getChatMessages(
  chatId: string
): Promise<StoredMessage[]> {
  try {
    const response = await axiosInstance.get<{ data: StoredMessage[] }>(
      `/chats/${chatId}/messages`
    );
    return response.data.data ?? [];
  } catch (error: any) {
    console.error(
      "getChatMessages error:",
      error?.response?.data?.error || error
    );
    return [];
  }
}

export async function fetchContactsFromChats(
  chatList: { contactId: string }[]
): Promise<UserInfo[]> {
  const contactPromises = chatList.map((chat) =>
    getContactInfo(chat.contactId)
  );
  const results = await Promise.all(contactPromises);
  return results.filter((contact): contact is UserInfo => contact !== null);
}
