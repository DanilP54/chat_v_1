import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";

export default function UploadAvatar() {
    return (
        <>
            <label htmlFor="avatar" className="cursor-pointer">
                <Avatar className="w-20 h-20">
                    <AvatarImage src='https://api.dicebear.com/9.x/fun-emoji/svg?seed=Rascal' alt="avatar" />
                    <AvatarFallback>
                        DP
                    </AvatarFallback>
                </Avatar>
                <Input id="avatar" type="file" className="hidden" />
            </label>
        </>
    )
}