import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { useState } from "react"

const ONLINE_COLOR = 'bg-blue-800'
const OFFLINE_COLOR = 'bg-red-800'


export const StatusToggle = () => {

    const [status, setStatus] = useState<'online' | 'offline'>('online')

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size="sm">
                        <span className={`w-3 h-3 ${status === 'online' ? ONLINE_COLOR : OFFLINE_COLOR} rounded-full`}></span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={status === 'online'}
                        className="flex items-center gap-3"
                        onClick={() => setStatus("online")}
                    >
                        <span className={`w-2 h-2 ${ONLINE_COLOR} rounded-full`}></span>
                        Online
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={status === 'offline'}
                        className="flex items-center gap-3"
                        onClick={() => setStatus("offline")}
                    >
                        <span className={`w-2 h-2 ${OFFLINE_COLOR} rounded-full`}></span>
                        Offline
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}