import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserInfoContextProvider from "@/Contexts/UserInfoContext";
import UserContactContextProvider from "@/Contexts/UserContactContext";
import ChatsContextProvider from "@/Contexts/ChatsContext";
import WebSocketContextProvider from "@/Contexts/WebsocketContext";
import ThemeContextProvider from "@/Contexts/ThemeContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QChat Dev",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh w-full`}
      >
        <ThemeContextProvider>
          <UserInfoContextProvider>
            <UserContactContextProvider>
              <ChatsContextProvider>
                <WebSocketContextProvider>{children}</WebSocketContextProvider>
              </ChatsContextProvider>
            </UserContactContextProvider>
          </UserInfoContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
