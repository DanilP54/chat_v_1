import React from "react";

type UserPhoneNumberType = {
    phoneNumber: string,
    className?: string
}

export const UserPhoneNumber: React.FC<UserPhoneNumberType> = ({phoneNumber, className = ''}) => {
    return <span className={className}>{phoneNumber}</span>
}