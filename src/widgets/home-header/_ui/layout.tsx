import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/shared/ui/dropdown-menu"
import { Menu } from "lucide-react"
import React from "react"

export const Layout = ({
    menu,
    indicator,
    actions
}: {
    menu: React.ReactNode
    indicator?: React.ReactNode
    actions: React.ReactNode
}) => {
    return (
        <>
            <header className="flex items-center justify-between">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <Menu strokeWidth={3} size={30} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ml-2 shadow-none border-[1px] border-gray-300 p-1 rounded-none">
                        {menu}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-4">
                    {actions}
                    {indicator}
                </div>
            </header>
        </>
    )
}