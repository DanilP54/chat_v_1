import React from "react";

export function AppHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex justify-between items-center p-4">
      {children}
    </header>
  );
}
``;
