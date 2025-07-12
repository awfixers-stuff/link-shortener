import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { TRPCProvider } from "@/providers/trpc-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./server/api/uploadthing/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AWFixer Links",
  description: "Shorten Links Easy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TRPCProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
            {children}
          </TRPCProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
