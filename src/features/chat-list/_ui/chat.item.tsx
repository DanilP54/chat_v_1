import { UserAvatar } from "@/entities/user/_ui/user.avatar";
import { UserDisplayName } from "@/entities/user/_ui/user.display.name";

export const ChatItem = () => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-5 flex-1">
        <div>
          <UserAvatar className="w-14 h-14" />
        </div>
        <div className="flex flex-col grow">
          <UserDisplayName
            displayName="Danil Putro"
            className="text-white text-lg font-bold"
          />
          <span className="text-gray-400 overflow-hidden text-ellipsis block whitespace-nowrap max-w-56">
            Привет, я сегодня не приду, потому что я занят и вообще у меня не
            всё заябсь
          </span>
        </div>
      </div>
      <div>
        <span className="text-white">12:23</span>
      </div>
    </div>
  );
};
