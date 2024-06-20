import { cn } from "@/shared/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";


// доделать fallback!!!!!!!

export type UserAvatarProps = {
    src: UserAvatar,
    className?: string,
}

export default function UserAvatar({
    src,
    className,
}: UserAvatarProps) {

    return (
        <>
            <Avatar className={cn(className)}>
                <AvatarImage src={src || ""} />
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
        </>
    )
}

