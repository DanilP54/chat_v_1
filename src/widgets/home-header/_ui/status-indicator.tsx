import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/shared/ui/tooltip"

type Status = 'online' | 'offline'

export const StatusIndicator = (status: Status) => {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <span className={`w-3 h-3 ${status === 'online' ? 'bg-blue-800' : 'bg-red-800'} rounded-full`}></span>
            </TooltipTrigger>
            <TooltipContent>
                <span>{status}</span>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}