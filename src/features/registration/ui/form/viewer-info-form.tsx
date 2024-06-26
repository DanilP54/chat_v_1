import UploadAvatar from "./upload-avatar";
import FirstNameInput from "./first-name-input";
import LastNameInput from "./last-name-input";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ViewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";






export default function ViewerInfoForm() {

    const form = useForm<z.infer<typeof ViewerInfoSchema>>({
        resolver: zodResolver(ViewerInfoSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            avatar: null
        },
        mode: "onSubmit",
    })

    function onSubmit(values: z.infer<typeof ViewerInfoSchema>) {
        const result = ViewerInfoSchema.safeParse(values)
        console.log(result)
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-full gap-9">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <UploadAvatar field={field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3 w-2/3">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FirstNameInput field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <LastNameInput field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <Button type="submit">Завершить регистрацию</Button>
                </div>
            </form>
        </Form >
    )
}