import { Link } from "react-router-dom";
import type { ChatPreview } from "@/entities/chat-preview";
import ChatCard from "@/entities/chat-preview/ui/chat-card";

interface ChatListProps {
  chat: ChatPreview[];
}

export default function ChatPreviewList({ chat }: ChatListProps) {

  if (!chat) return <div>No data</div>

  return (
    <div>
      <ul className="mt-3 flex h-full flex-col">
        {
          chat.map(chat => (
            <li key={chat.chatId}>
              <Link to={`/chat/${chat.chatId}`} className="flex items-center gap-4 p-3 hover:bg-gray-300">
                <ChatCard
                  avatar={chat.receiver.avatar}
                  lastMessage={chat.lastMessage}
                  name={chat.receiver.name}
                />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
