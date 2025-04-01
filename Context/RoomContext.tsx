"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Room = {
  roomId: string;
  participants: string[];
  messages: string[];
  createdAt: Date;
};

type RoomContext = {
  roomInfo: Room | null;
  setRoomInfo: Dispatch<SetStateAction<Room | null>>;
};

const RoomContext = createContext<RoomContext | null>(null);

export default function RoomContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);

  return (
    <RoomContext.Provider
      value={{
        roomInfo,
        setRoomInfo,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoomContext() {
  const context = useContext(RoomContext);

  if (!context)
    throw new Error("useRoomContext must be used within RoomContextProvider");

  return context;
}
