import { AuthProvider } from "@/entities/session";
import { ThemeProvider } from "@/features/theme-toggle/ui/theme-provider";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    )
}