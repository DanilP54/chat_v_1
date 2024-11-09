import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Menu } from "lucide-react"


import React from "react"


export const Layout = ({
    menu,
    themeAction,
    statusAction
}: {
    menu: React.ReactNode
    themeAction: React.ReactNode
    statusAction: React.ReactNode
}) => {
    return (
        <>
            <header className="flex items-center justify-between">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Menu strokeWidth={2} size={35} color="#333" className="cursor-pointer dark:invert" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ml-2 bg-gray-200 border-[1px] border-gray-300 p-1 rounded-lg">
                        {menu}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-8">
                    {statusAction}
                    {themeAction}
                </div>
            </header>
        </>
    )
}