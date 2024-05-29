import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { CreditCard, Settings, User } from "./icons";

export default function ChatActionsMenu() {
  return (
    <>
      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>
    </>
  )
}
