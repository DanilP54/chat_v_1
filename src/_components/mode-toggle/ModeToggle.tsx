// import { Moon, Sun } from "lucide-react"
import { Moon, Sun, Computer } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from "@/context/ThemeContext"

export function ModeToggle() {
    
    const { setTheme } = useTheme()
    
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"default"} size="sm" className=" focus-visible:ring-opacity-0 bg-yellow-400 dark:bg-blue-950">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:invert" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-3" onClick={() => setTheme("light")}>
                    <span>
                        <Sun size={20} />
                    </span>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3" onClick={() => setTheme("dark")}>
                    <span>
                        <Moon size={20} />
                    </span>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3" onClick={() => setTheme("system")}>
                    <span>
                        <Computer size={20} />
                    </span>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
