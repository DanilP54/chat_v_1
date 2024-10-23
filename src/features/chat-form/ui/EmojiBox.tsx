import { Smile } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useFormContext } from "react-hook-form"



export default function EmojiBox() {

    const { getValues, setValue, } = useFormContext()

    const handleEmojiClick = (e) => {
        const currentValue = getValues().text || ""
        console.log(e)
        setValue("text", currentValue + e.emoji)
    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        type="button"
                        variant={"link"}
                        className="rounded-lg p-0 w-10 h-8"
                    >
                        <Smile size={23} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none p-0 rounded-lg m-3">
                    <EmojiPicker
                        lazyLoadEmojis={true}
                        skinTonesDisabled={true}
                        searchDisabled={true}
                        reactions={[]}
                        allowExpandReactions={true}
                        height={300}
                        onEmojiClick={handleEmojiClick}
                        className="w-full rounded-none h-80"
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
