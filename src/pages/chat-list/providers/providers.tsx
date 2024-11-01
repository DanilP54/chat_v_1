import UserProfileProvider from "@/entities/user/_ui/profile.provider";
import React from "react";

export function ChatListProviders({ children }: { children: React.ReactNode }) {
  return <UserProfileProvider>{children}</UserProfileProvider>;
}
