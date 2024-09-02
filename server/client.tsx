'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { AppRouter } from "server";
import { makeQueryClient } from "./query-client";

export const trpc = createTRPCReact<AppRouter>({});

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return 'http://localhost:8082';
  })();
  return `${base}/api/trpc`;
}

export function TRPCProvider({children}: {children: React.ReactNode}) {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(trpc.createClient({
        links: [
            httpBatchLink({
                url: getUrl(),
            }),
        ],
    }));

    return <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
}