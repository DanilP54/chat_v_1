import { Paperclip, SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EmojiMenu from "../shared/EmojiMenu";

export const ChatForm = () => {
    
    const onSubmit = (e) => {
        console.log(e)
    }
    

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 h-11 w-full bg-slate-50 rounded-lg px-1">
                <div>
                    <EmojiMenu />
                </div>
                <div className="flex-1">
                    <Input multiple className="bg-transparent border-none text-base" placeholder="Сообщение" />
                </div>
                <div>
                    <Button onClick={() => document.getElementById('uploud-file')?.click()} variant={'link'} className="rounded-lg p-0 w-10 h-8">
                        <Paperclip size={18} />
                    </Button>
                    <Input type="file" className="hidden" id="uploud-file" />
                </div>

            </div >
            <div>
                <Button variant="noShadow" className="rounded-lg p-0 w-10">
                    <SendHorizonal size={20} />
                </Button>
            </div>
        </div>
    )
}
