import { Chat, ChatCard } from "@/entities/chat";
import { Link } from "react-router-dom";

interface ChatListProps {
  chat: Chat[];
}

export default function ChatList({ chat }: ChatListProps) {

  if (!chat) return <div>No data</div>

  return (
    <div>
      <ul className="mt-3 flex h-full flex-col">
        {
          chat.map(chat => (
            <li key={chat.chatId}>
              <Link to={`/chat/${chat.chatId}`} className="flex items-center gap-4 p-3 hover:bg-gray-300">
                <ChatCard
                  avatar={chat.avatar}
                  lastMessage={chat.lastMessage}
                  name={chat.name}
                />
              </Link>
            </li>
          ))
        }


      </ul>
    </div>
  )
}
