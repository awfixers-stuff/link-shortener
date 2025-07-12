"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { makeQueryClient } from "@/app/server/trpc/query-client";
import { trpc } from "@/app/server/trpc/client";

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getURL() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.NEXT_PUBLIC_APP_URL)
      return `https://${process.env.NEXT_PUBLIC_APP_URL}`;
    return "http://localhost:3000";
  })();

  return `${base}/server/api/trpc`;
}

export function TRPCProvider(props: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ transformer: superjson, url: getURL() })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
