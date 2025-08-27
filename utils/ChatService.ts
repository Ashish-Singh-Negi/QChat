import axiosInstance from "@/utils/axiosinstance";
import { PaginationMeta, Chat, StoredMessage } from "@/Interface/definations";

interface ChatWithPaginationMeta extends Chat {
  pagination: PaginationMeta;
}

export type ChatRoomResult =
  | { success: true; chat: ChatWithPaginationMeta }
  | { success: false; error: string };

export async function getChatMessages(
  chatId: string,
  page: number,
  limit: number
): Promise<
  | {
      data: StoredMessage[];
      pagination: PaginationMeta;
    }
  | []
> {
  try {
    const { data } = await axiosInstance.get<{
      data: StoredMessage[];
      pagination: PaginationMeta;
    }>(`/chats/${chatId}/messages`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    console.log("🚀 ~ getChatMessages ~ data:", data);

    return data;
  } catch (error: any) {
    console.error(
      "getChatMessages error:",
      error?.response?.data?.error || error
    );
    return [];
  }
}

export async function getChatRoomInfo(chatId: string): Promise<ChatRoomResult> {
  try {
    const response = await axiosInstance.get<{
      data: Chat;
      pagination: PaginationMeta;
    }>(`/chats/${chatId}`);

    const chatWithPaginationMeta = {
      ...response.data.data,
      pagination: response.data.pagination,
    };

    return {
      success: true,
      chat: chatWithPaginationMeta,
    };
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.error || "Failed to fetch Chat info";
    console.error("getChatRoomInfo error:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

export async function fetchAllChats(
  chatIds: string[]
): Promise<ChatWithPaginationMeta[]> {
  const chatRoomPromises = chatIds.map((chatId) => {
    if (!chatId) {
      console.warn("Missing chatId");
      return Promise.resolve(null);
    }
    return getChatRoomInfo(chatId);
  });

  const results = await Promise.all(chatRoomPromises);

  const validChats = results
    .filter(
      (res): res is { success: true; chat: ChatWithPaginationMeta } =>
        res?.success ?? true
    )
    .map((res) => res.chat);

  return validChats;
}
