import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const MobileMenu = () => {

    // Получаем данные widget

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm">
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav>
                    <SheetHeader className="mt-8">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback>DP</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h3>Danil Putro</h3>
                                <span className=" text-[13px]">Что-то ещё...</span>
                            </div>
                        </div>
                    </SheetHeader>
                    <SheetFooter>
                        <SheetClose asChild>

                        </SheetClose>
                    </SheetFooter>
                </nav>

            </SheetContent>
        </Sheet>
    )
}
