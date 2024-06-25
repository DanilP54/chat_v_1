import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function EntryViewerInfo() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-9">
            <div className="relative min-h-min">
                <label htmlFor="avatar" className="cursor-pointer">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src='https://api.dicebear.com/9.x/fun-emoji/svg?seed=Rascal' alt="avatar" />
                        <AvatarFallback>
                            DP
                        </AvatarFallback>
                    </Avatar>
                    <Input id="avatar" type="file" className="hidden" />
                </label>
            </div>
            <div className="flex flex-col gap-3 w-2/3">
                <Input type="text" name="firstName" placeholder="Введите имя" required />
                <Input type="text" name="lastName" placeholder="Введите фамилию" required />
            </div>
            <Button disabled={true}>Завершить регистрацию</Button>
        </div>
    )
}