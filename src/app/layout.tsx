import type * as next from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/toaster"
import { CheckLoginUser } from "@/services/global/CheckLoginUser";
import ProtectedRoute from "./ProtectedRoute";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchoolPro",
  description: "SchoolPro Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <CheckLoginUser>
        <ProtectedRoute>
          <html lang="en">
            <body className={inter.className}>
              {children}
            <Toaster />
            </body>
          </html>
        </ProtectedRoute>
      </CheckLoginUser>
    </StoreProvider>
  );
}
