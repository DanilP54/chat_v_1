import { SearcheBar } from "@/features/searche-bar";
import ButtonDialog from "@/shared/ui/button-dialog";
import { Plus } from './icons/index';
import { ChatCreator } from "./chat-creator";
import { ChatList } from "@/features/chat-list";
import { Chat } from "@/entities/chat";


// иммитация базы данных
const chats: Chat[] = [
    {
        name: 'Vika Opala',
        chatId: 'ch73289r87cn7849',
        avatar: 'https://api.dicebear.com/8.x/personas/svg?seed=Trouble',
        isSeen: false,
        lastMessage: 'Чё ты не отвечаешь?',
        receiverId: 'c783298c4789f7n7893'
    },
    {
        name: 'Vika Opala',
        chatId: 'ch73289r87cn7849',
        avatar: 'https://api.dicebear.com/8.x/personas/svg?seed=Trouble',
        isSeen: false,
        lastMessage: 'Чё ты не отвечаешь?',
        receiverId: 'c783298c4789f7n7893'
    }
]



export default function ChatHub() {

    // получаем чаты из базы данных

    return (
        <div>
            <div className="flex items-center">
                <SearcheBar />
                <ButtonDialog
                    buttonIcon={<Plus />}
                    renderContent={<ChatCreator />}
                />
            </div>
            <ChatList chat={chats} />
        </div>
    )
}