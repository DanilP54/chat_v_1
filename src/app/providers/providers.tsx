import SessionProvider from "@/entities/session/_ui/session.provider";
import { ThemeProvider } from "@/features/theme-toggle/ui/theme-provider";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
          {children}
      </SessionProvider>
    </ThemeProvider>)
}
