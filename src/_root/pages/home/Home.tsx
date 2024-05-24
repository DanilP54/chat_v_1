import { MobileMenu } from "@/components/shared/MobileMenu"
import { ModeToggle } from "@/components/mode-toggle/ModeToggle"
import Chats from "@/components/shared/Chats"
import Search from "@/components/shared/Search"

const Home = () => {

  return (
        <div className="flex flex-col h-full justify-between gap-1">
            <header className="flex flex-col gap-6 p-5 shrink">
                <div className="flex items-center justify-between gap-5">
                    <MobileMenu />
                    <ModeToggle />
                </div>
                <div>
                    <Search />
                </div>
            </header>
            <main className="flex-1 overflow-hidden over">
                <Chats />
            </main>
        </div>

    )
}

export default Home
