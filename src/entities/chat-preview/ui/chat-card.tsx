import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import type { ChatPreview } from '../domain/chat-preview';

interface ChatCardProps {
    avatar: ChatPreview["avatar"],
    name: ChatPreview["name"],
    lastMessage: ChatPreview["lastMessage"]
}

export default function ChatCard({ avatar, lastMessage, name }: ChatCardProps) {

    return (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
                <h3>{name}</h3>
                <span className="text-slate-700 text-[14px]">{lastMessage}</span>
            </div>
        </div>
    )
}