import { UserAvatar } from "@/entities/user/_ui/user.avatar";
import { UserDisplayName } from "@/entities/user/_ui/user.display.name";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import { User, Settings, Plus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const ICON_SIZE = 20;

export const Menu = () => {
  return (
    <>
      <DropdownMenuLabel className="text-base">
        <div className="flex items-center gap-3">
          <UserAvatar className="w-7 h-7" />
          <UserDisplayName displayName={"Danil Putro"} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <nav>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
            <Link
              to={"/profile"}
              className="text-base flex items-center gap-1 "
            >
              <User size={ICON_SIZE} className="mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
            <Link
              to={"/settings"}
              className="text-base flex items-center gap-1"
            >
              <Settings size={ICON_SIZE} className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
            <Link to={"/search"} className="text-base flex items-center gap-1">
              <Plus size={ICON_SIZE} className="mr-2" />
              New Chat
            </Link>
          </DropdownMenuItem>
        </nav>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer gap-1 hover:bg-gray-300 text-base font-bold">
          <LogOut size={ICON_SIZE} className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
