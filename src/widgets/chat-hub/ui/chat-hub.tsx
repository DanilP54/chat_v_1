import { ChatPreviewList } from "@/features/chat-list";
import type { ChatPreview } from "@/entities/chat-room-preview";

// иммитация базы данных
const chats: ChatPreview[] = [
  {
    receiver: {
      name: "Vika Opala",
      avatar: "https://api.dicebear.com/8.x/personas/svg?seed=Trouble",
    },
    chatId: "ch73289r87cn7849",
    isSeen: false,
    lastMessage: "Чё ты не отвечаешь?",
  },
  {
    receiver: {
      name: "Vika Opala",
      avatar: "https://api.dicebear.com/8.x/personas/svg?seed=Trouble",
    },
    chatId: "ch73289r87cn7849",
    isSeen: false,
    lastMessage: "Чё ты не отвечаешь?",
  },
];

export default function ChatHub() {
  // получаем чаты из базы данных

  return (
    <div>
      <ChatPreviewList chat={chats} />
    </div>
  );
}
