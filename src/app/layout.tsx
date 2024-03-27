"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import { useState } from "react";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "SchoolPro",
//   description: "SchoolPro Management",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isAuthenticated, setIsAuthenticated] = useState({isAuthenticated: false});

  const logout = () => {
    console.log("Logout");
  }

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
        {/* <Navbar auth={isAuthenticated} logout={logout} /> */}
          {children}
        <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
