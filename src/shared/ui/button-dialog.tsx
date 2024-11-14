import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

type ButtonDialogProps = {
  buttonIcon: React.ReactNode;
  renderContent: React.ReactNode;
};

export default function ButtonDialog({
  buttonIcon,
  renderContent,
}: ButtonDialogProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            {buttonIcon}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {renderContent}
        </DialogContent>
      </Dialog>
    </>
  );
}
