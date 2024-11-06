import { Link } from "react-router-dom";
// import type { ChatPreview } from "@/entities/chat-room-preview";
// import ChatCard from "@/entities/chat-room-preview/ui/chat-room-card";

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
              <Link to={`/convo/${chat.chatId}`} className="flex items-center gap-4 p-3 hover:bg-gray-300">
               {/* <ChatCard
                  avatar={chat-room.receiver.avatar}
                  lastMessage={chat-room.lastMessage}
                  name={chat-room.receiver.name}
                /> */} 
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
