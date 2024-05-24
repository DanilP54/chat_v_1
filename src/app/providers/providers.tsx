import { ThemeProvider } from "@/features/theme-toggle/ui/theme-provider";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}