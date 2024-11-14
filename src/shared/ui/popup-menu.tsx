import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import React from "react";

interface PopupMenuProps {
  items: React.ReactNode;
  buttonIcon: React.ReactNode;
}
export default function PopupMenu({ items, buttonIcon }: PopupMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="p-0">
          {buttonIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-1">{items}</DropdownMenuContent>
    </DropdownMenu>
  );
}
