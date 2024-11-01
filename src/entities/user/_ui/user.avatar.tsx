import { cn } from "@/shared/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx";

export const UserAvatar = ({
  className,
  url,
}: {
  className: string;
  url?: string;
}) => {
  return (
    <>
      <Avatar className={cn(className)}>
        <AvatarImage src={url ?? ""} alt="avatar" className="object-cover" />
        <AvatarFallback className="bg-cyan-900 text-white text-lg font-bold">
          DP
        </AvatarFallback>
      </Avatar>
    </>
  );
};
