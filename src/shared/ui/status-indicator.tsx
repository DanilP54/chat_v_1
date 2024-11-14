import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export const StatusIndicator = (status: "online" | "offline") => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`w-3 h-3 ${status === "online" ? "bg-blue-800" : "bg-red-800"} rounded-full`}
          ></span>
        </TooltipTrigger>
        <TooltipContent>
          <span>{status}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
