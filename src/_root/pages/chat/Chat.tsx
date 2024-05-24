import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatMenu from "@/components/shared/ChatMenu"

import { ChatForm } from "@/components/ChatForm/ChatForm"







const Chat = () => {
    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-5 gap-4">
                <div>
                    <Link to="/home">
                        <ArrowLeft />
                    </Link>
                </div>
                <div className="flex items-center gap-3 w-full">
                    <Link to="/userdetails" className="flex gap-3 items-center">
                        <Avatar>
                            <AvatarImage src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Bandit" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h3>Danil Putro</h3>
                            <span className="text-[14px] text-gray-700">был(a) недавно</span>
                        </div>
                    </Link>
                    <div className="ml-auto">
                        <ChatMenu />
                    </div>
                </div>
            </header>
            <main className="flex-1">

            </main>
            <footer className="px-1 py-1 m-2 h-14 rounded-lg">
                <ChatForm />
            </footer>
        </div>
    )
}

export default Chat