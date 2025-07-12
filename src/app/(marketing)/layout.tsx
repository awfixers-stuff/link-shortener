import React from "react";
import { MarketingNavbar } from "./_navbar";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <MarketingNavbar />

      {children}
    </div>
  );
}
