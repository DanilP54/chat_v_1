import { Link } from "react-router-dom";
import { ArrowLeft } from "./icons";
import { ClientAvatar } from "@/entities/client";
import PopupMenu from "@/shared/ui/popup-menu";

export default function TopBar() {
  return (
    <div className="flex items-center gap-7 w-full">
      <div>
        <Link to="/home">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex items-center gap-3 w-full">
        <Link to="/userdetails" className="flex gap-3 items-center">
          <ClientAvatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Bandit" />
          <div className="flex flex-col">
            <h3>Danil Putro</h3>
            <span className="text-[14px] text-gray-700">был(a) недавно</span>
          </div>
        </Link>
        <div className="ml-auto">
          <PopupMenu />
        </div>
      </div>
    </div>
  )
}
