import UserProfileProvider from "@/entities/user/_ui/profile.provider";
import React from "react";

export const HomeProviders = ({ children }: { children: React.ReactNode }) => {
  return <UserProfileProvider>{children}</UserProfileProvider>;
};
