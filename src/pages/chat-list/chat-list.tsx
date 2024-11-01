import { ChatHub } from "@/widgets/chat-hub";

import {
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Menu,
} from "lucide-react";

import { Button } from "@/shared/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ChatListProviders } from "./providers/providers";

export default function ChatListPage() {
  return (
    <>
      <ChatListProviders>
        <div className="h-full flex flex-col gap-4">
          <header className="flex justify-between items-center p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Menu strokeWidth={3} size={30} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 ml-2 shadow-none border-[1px] border-gray-300 p-1 rounded-none">
                <DropdownMenuLabel>Danil Putro</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled
                    className="cursor-pointer hover:bg-gray-300"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <Link to="/search">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>New Chat</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer hover:bg-gray-300">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="m-2 shadow-none border-[1px] border-gray-300 p-1 rounded-none">
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Dark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-300 ">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Light</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>System</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer hover:bg-gray-300">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="m-2 shadow-none border-[1px] border-gray-300 p-1 rounded-none">
                        <DropdownMenuItem
                          disabled
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300"
                        >
                          <span className="w-2 aspect-square bg-blue-800 rounded-full"></span>
                          <span>Active</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-300">
                          <span className="w-2 aspect-square bg-red-800 rounded-full"></span>
                          <span>Not Active</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/*<ButtonSheet*/}
            {/*    buttonIcon={<Menu />}*/}
            {/*    buttonSize="sm"*/}
            {/*    buttonVariant="default"*/}
            {/*    sheetSide="left"*/}
            {/*    sheetContent={<NavigationMenu />}*/}
            {/*/>*/}
            {/*<ThemeToggle />*/}

            <span className="w-3 h-3 bg-blue-800 rounded-full"></span>
          </header>
          <main className="flex-1">
            <ChatHub />
          </main>
        </div>
      </ChatListProviders>
    </>
  );
}
