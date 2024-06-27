import UploadAvatar from "./upload-avatar";
import FirstNameInput from "./first-name-input";
import LastNameInput from "./last-name-input";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { viewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";
import { useToast } from "@/shared/ui/use-toast";
import { useNavigate } from "react-router-dom";






export default function ViewerInfoForm() {

    const { toast } = useToast()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof viewerInfoSchema>>({
        defaultValues: {
            firstname: "",
            lastname: "",
            avatar: null
        },
        mode: "onSubmit",
    })

    function onSubmit(values: z.infer<typeof viewerInfoSchema>) {

        const isValid = viewerInfoSchema.safeParse(values)

        if (isValid.success) {
            navigate('/home')
        }

        if (isValid.error) {
            console.log(isValid.error.formErrors)
            toast({
                title: 'Невалидное имя',
                variant: 'destructive',
                description: isValid.error.formErrors.fieldErrors.firstname?.join(', \n'),
            })
        }
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
                    <Button variant="noShadow" className="bg-emerald-700" type="submit">Завершить регистрацию</Button>
                </div>
            </form>
        </Form >
    )
}