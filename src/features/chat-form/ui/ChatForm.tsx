import {EmojiBox, FileInput, TextInput} from "./index"
import {Button} from "@/shared/ui/button";
import {Form, FormControl, FormField, FormItem} from "@/shared/ui/form";
import {SendHorizonal} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormSchema} from "../lib/form-schema";
import {z} from "zod";
import {useState} from "react";

export default function ChatForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            text: "",
            file: null,
        }
    })

    const [height, setHeight] = useState('64')
    console.log("form: ", height )
    const onSubmit = (value: z.infer<typeof FormSchema>) => {
        console.log(value)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className={`flex items-center h-[64px] overflow-hidden gap-2 w-full bg-slate-50 rounded-lg px-1`}>
                <EmojiBox key="emoji"/>
                <FormField
                    control={form.control}
                    name="text"
                    render={({field}) => (
                        <FormItem className="flex-1 h-full overflow-hidden">
                            <FormControl>
                                <TextInput placeholder="Сообщение" field={field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <FileInput/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button disabled={true} type="submit" variant="noShadow" className="rounded-lg p-0 w-10 h-9">
                    <SendHorizonal size={20}/>
                </Button>
            </form>
        </Form>
    )
}
