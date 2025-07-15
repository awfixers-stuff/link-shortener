import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { ColorSchemeProvider } from "@/providers/color-scheme-provider";
import { TRPCProvider } from "@/providers/trpc-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./server/api/uploadthing/core";
import "./globals.css";

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
        <ColorSchemeProvider>
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
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
