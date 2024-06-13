import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Paperclip } from "lucide-react";

export default function FileInput() {
    return (
        <>
            <Button onClick={() => document.getElementById('uploud-file')?.click()} variant={'link'} className="rounded-lg p-0 w-10 h-8">
                <Paperclip size={20} />
            </Button>
            <Input type="file" className="hidden" id="uploud-file" />
        </>
    )
}
