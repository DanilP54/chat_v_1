import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Pencil } from "lucide-react";

export default function EntryViewerInfo() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-9">
            <div className="relative min-h-min">
                <label htmlFor="avatar" className="cursor-pointer">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src='https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Leo' alt="avatar" />
                        <AvatarFallback>
                            DP
                        </AvatarFallback>
                    </Avatar>
                    <Input id="avatar" type="file" className="hidden" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex absolute hover:bg-slate-800 -bottom-2 -left-7 items-center justify-center w-min gap-1 px-[5px] py-[2px] rounded-lg bg-slate-900">
                                <Pencil color="white" size={12} />
                                <span className="text-sm text-white rounded-lg cursor-pointer">edit</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-min p-0 rounded-none bg-transparent">
                            <DropdownMenuItem className="bg-slate-700 p-1 rounded-none cursor-pointer hover:bg-blue-500">
                                <span onClick={() => document.querySelector('#avatar')?.click()} className="text-white w-full text-center">Upload Photo</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="p-0 m-0" />
                            <DropdownMenuItem className="bg-slate-700 p-1 rounded-none cursor-pointer hover:bg-blue-500">
                                <span className="text-white w-full text-center">Remove Photo</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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