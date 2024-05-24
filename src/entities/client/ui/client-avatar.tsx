import { cn } from "@/shared/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";


// доделать fallback!!!!!!!

export type ClientAvatarProps = {
    src: ClientAvatar,
    className?: string,
}

export default function ClientAvatar({
    src,
    className,
}: ClientAvatarProps) {

    return (
        <>
            <Avatar className={cn(className)}>
                <AvatarImage src={src || ""} />
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
        </>
    )
}

