import { Link } from "react-router-dom";
import { ArrowLeft, EllipsisVertical } from "./icons";
// import { AvatarValueObject } from "@/entities/user";
import PopupMenu from "@/shared/ui/popup-menu";
import { ChatActionsMenu } from "@/features/chat-actions-menu";

export default function TopBar() {
  return (
    <header className="px-4 py-2 bg-white w-full">
      <div className="flex items-center gap-7 w-full">
        <div>
          <Link to="/home">
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex items-center gap-3 w-full">
          <Link to="/chatdetails/8e9nx9e38xnn8" state={{ prevId: "8e9nx9e38xnn8" }} className="flex gap-3 items-center">
            {/* <AvatarValueObject src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Bandit" /> */}
            <div className="flex flex-col">
              <h3>Danil Putro</h3>
              <span className="text-[14px] text-gray-700">был(a) недавно</span>
            </div>
          </Link>
          <div className="ml-auto">
            <PopupMenu
              buttonIcon={<EllipsisVertical className='ml-auto w-full' />}
              items={<ChatActionsMenu />}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
