import SessionProvider from "@/entities/session/_ui/session.provider";
import { ThemeProvider } from "@/features/theme-toggle/ui/theme-provider";
import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
      <ReactQueryDevtools  />
    </QueryClientProvider>
  );
}
