import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip"
import React from "react"

export const StatusToggle = () => {

    const [status, setStatus] = React.useState<'online' | 'offline'>('online')

    const isOnline = status === 'online'

    const handleChangeStatus = () => {
        setStatus(status === 'online' ? 'offline' : 'online')
    }

    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <span data-testid="status" onClick={handleChangeStatus} className={`w-2 h-2 ${isOnline ? 'bg-blue-800' : 'bg-red-800'} rounded-full mr-10 cursor-pointer`}></span>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={20}>
                <span data-testid="text status" className="bg-black text-white p-2 text-sm font-bold rounded-lg">you is {status}</span>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}