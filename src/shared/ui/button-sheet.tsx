import React from "react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

type ButtonSheetProps = {
    sheetContent: JSX.Element;
    sheetSide: "left" | "top" | "bottom" | "right";
    buttonIcon: React.ReactNode;
    buttonVariant: "default" | "link" | "noShadow" | "neutral";
    buttonSize: "sm" | "lg" | "default" | "icon";
}

export function ButtonSheet({
    sheetContent,
    sheetSide,
    buttonIcon,
    buttonVariant,
    buttonSize,
}: ButtonSheetProps) {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={buttonVariant} size={buttonSize}>
                        {buttonIcon}
                    </Button>
                </SheetTrigger>
                <SheetContent className='p-0' side={sheetSide}>
                    {sheetContent}
                </SheetContent>
            </Sheet>

        </>
    )
}