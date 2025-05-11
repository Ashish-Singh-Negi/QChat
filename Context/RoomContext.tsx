"use client";

import { Room } from "@/app/Inteface/definations";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    console.log(roomInfo);
  }, [roomInfo]);

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
