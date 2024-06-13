import { EmojiBox, FileInput, TextInput } from "./index"
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { SendHorizonal } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../lib/form-schema";
import { z } from "zod";


export default function ChatForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            text: "",
            file: null,
        }
    })
    console.log(form.watch("text"))
    const onSubmit = (value: z.infer<typeof FormSchema>) => {
        console.log(value)
    }

    return (
        <>
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-4'>
                        <div className="flex items-center shadow-amber-950 shadow-2xl h-base-height overflow-hidden gap-2 w-full bg-slate-50 rounded-lg px-1">
                            <div className="self-end h-[56px] flex items-center justify-center">
                                <EmojiBox key="emoji" />
                            </div>
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem className="flex-1 h-full overflow-hidden">
                                        <FormControl>
                                            <TextInput placeholder="Сообщение" field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem className="self-end h-[56px] flex items-center justify-center">
                                        <FormControl>
                                            <FileInput />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="h-[56px] flex items-center justify-center self-end">
                            <Button type="submit" variant="noShadow" className=" rounded-full p-0 aspect-square h-full">
                                <SendHorizonal size={23} />
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </>
    )
}
