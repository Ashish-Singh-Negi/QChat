import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserInfoContextProvider from "@/Context/UserInfoContext";
import UserContactContextProvider from "@/Context/UserContactContext";
import RoomContextProvider from "@/Context/RoomContext";
import WebSocketContextProvider from "@/Context/WebsocketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QChat",
  description: "comming soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserInfoContextProvider>
          <UserContactContextProvider>
            <WebSocketContextProvider>
              <RoomContextProvider>{children}</RoomContextProvider>
            </WebSocketContextProvider>
          </UserContactContextProvider>
        </UserInfoContextProvider>
      </body>
    </html>
  );
}
