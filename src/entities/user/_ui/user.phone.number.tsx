import React from "react";

type UserPhoneNumberType = {
    phoneNumber: string,
    className?: string
}

export function UserPhoneNumber({phoneNumber, className = ''}: UserPhoneNumberType) {
    return <span className={className}>{phoneNumber}</span>
}