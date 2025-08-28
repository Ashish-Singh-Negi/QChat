import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserInfoContextProvider from "@/Context/UserInfoContext";
import UserContactContextProvider from "@/Context/UserContactContext";
import ChatsContextProvider from "@/Context/ChatsContext";
import WebSocketContextProvider from "@/Context/WebsocketContext";
import ThemeContextProvider from "@/Context/ThemeContextProvider";

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
