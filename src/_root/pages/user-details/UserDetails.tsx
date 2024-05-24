import UserDetailsAccordeoin from "@/components/shared/UserDetailsAccordeoin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


const UserDetails = () => {

    return (
        <div className="h-full flex flex-col justify-between gap-3">
            <header className="flex flex-col p-4 shrink">
                <div className="p-2">
                    <Link to="/chat">
                        <ArrowLeft />
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center mt-7">
                    <Avatar className="w-20 h-20 bg-transparent">
                        <AvatarImage src="https://api.dicebear.com/8.x/adventurer/svg?seed=Garfield" />
                        <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <h2 className=" font-mono font-bold text-xl mt-3">Danil Putro</h2>
                    <span className="font-mono font-thin text-lg mt-1">Lorem ipsi quam ipsa rerum?</span>
                </div>
            </header>
            <main className="flex-1">
                <UserDetailsAccordeoin />
            </main>
            <footer className="mb-8 m-auto">
                <Button variant="noShadow" className='bg-red-500 border-none'>Block User</Button>
            </footer>
        </div>
    )
}

export default UserDetails;