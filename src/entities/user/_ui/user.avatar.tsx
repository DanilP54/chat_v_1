import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar.tsx";

type UserAvatarProps = {
    size: number,
    url: string,
    fallback: string
}


export const UserAvatar: React.FC<UserAvatarProps> = ({size, url, fallback}) => {

    return (
        <>
            <Avatar className={`w-[56px] h-[56px]`}>
                <AvatarImage src={url}/>
                <AvatarFallback className='bg-blue-400'>{fallback}</AvatarFallback>
            </Avatar>
        </>
    )
}