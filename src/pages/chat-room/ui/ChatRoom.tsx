import { ChatContent } from "@/widgets/chat-content";
import { TopBar } from "@/widgets/top-bar";

export default function ChatRoom() {
  return (
    <div className="flex flex-col h-full gap-2">
      <TopBar />
      <ChatContent />
    </div>
  );
}
