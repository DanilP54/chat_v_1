import React from "react";

type UserDisplayNameType = {
    displayName: string,
    className?: string
}

export const UserDisplayName: React.FC<UserDisplayNameType> = ({displayName, className = ''}) => {
    return <span className={className}>{displayName}</span>
}