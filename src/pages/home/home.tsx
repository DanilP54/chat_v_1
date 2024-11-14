import { HomeHeader } from "@/widgets/home-header/home.header";
import { HomeProviders } from "./providers/providers";
import { ChatList } from "@/features/chat-list/chat.list";

export const HomePage = () => {
  return (
    <HomeProviders>
      <div className="h-full">
        <div className="p-4">
          <HomeHeader />
        </div>
        <div className="mt-3 p-4">
          <ChatList />
        </div>
      </div>
    </HomeProviders>
  );
};
