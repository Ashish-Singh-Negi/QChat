import axiosInstance from "@/utils/axiosinstance";
import { Room } from "@/Interface/definations";

export type ChatRoomResult =
  | { success: true; chat: Room }
  | { success: false; error: string };

export async function getChatRoomInfo(chatId: string): Promise<ChatRoomResult> {
  try {
    const response = await axiosInstance.get<{ data: Room }>(
      `/chats/${chatId}`
    );
    return { success: true, chat: response.data.data };
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.error || "Failed to fetch Chat info";
    console.error("getChatRoomInfo error:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

export async function fetchAllChats(chatIds: string[]): Promise<Room[]> {
  const chatRoomPromises = chatIds.map((chatId) => {
    if (!chatId) {
      console.warn("Missing chatId");
      return Promise.resolve(null);
    }
    return getChatRoomInfo(chatId);
  });

  const results = await Promise.all(chatRoomPromises);

  const validChats = results
    .filter((res): res is { success: true; chat: Room } => res?.success ?? true)
    .map((res) => res.chat);

  return validChats;
}
