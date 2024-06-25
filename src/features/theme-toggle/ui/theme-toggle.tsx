import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button.tsx";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Computer } from "./icons/index.ts";

export function ThemeToggle() {

    const { setTheme } = useTheme()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"default"} size="sm"
                        className=" focus-visible:ring-opacity-0 bg-yellow-400 dark:bg-blue-950">
                        <Sun size={20}
                            className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                        <Moon size={20}
                            className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:invert' />
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
        </>
    )
}
