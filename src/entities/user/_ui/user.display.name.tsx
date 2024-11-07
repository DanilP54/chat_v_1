import { cn } from "@/shared/lib/cn";
import React from "react";

type UserDisplayNameType = {
    displayName: string,
    className?: string
}

export const UserDisplayName: React.FC<UserDisplayNameType> = ({displayName, className = ''}) => {
    return <span className={cn(className)}>{displayName}</span>
}