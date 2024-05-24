

import { Smile } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


const EmojiMenu = () => {



    const handleEmojiClick = (e) => {
        console.log(e)
    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"link"}
                        className="rounded-lg p-0 w-10 h-8"
                    >
                        <Smile />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none p-0 rounded-lg m-3">
                    <EmojiPicker
                        lazyLoadEmojis={true}
                        skinTonesDisabled={true}
                        searchDisabled={true}
                        reactions={[]}
                        allowExpandReactions={true}
                        width={280}
                        height={300}
                        onEmojiClick={handleEmojiClick}
                        style={{
                            borderRadius: 0,
                        }}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default EmojiMenu
