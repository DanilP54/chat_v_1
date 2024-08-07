import UploadAvatar from "./upload-avatar.tsx";
import FirstNameInput from "./first-name-input.tsx";
import LastNameInput from "./last-name-input.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form.tsx";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createProfileSchema } from "../lib/form-shema/create-profile-schema.ts";
import { useToast } from "@/shared/ui/use-toast.ts";
import { useAuthState } from "@/entities/session";
import { Loader } from "@/shared/ui/loader";
import { useCreateProfileData } from "@/features/create-profile/lib/hooks/useCreateProfileData.ts";


export default function CreateProfileForm() {


    const { toast } = useToast()
    const state = useAuthState()

    const profileData = useCreateProfileData()
    // const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null)

    const form = useForm<z.infer<typeof createProfileSchema>>({
        defaultValues: {
            firstname: "",
            lastname: "",
            avatar: undefined
        },
        mode: "onSubmit",
    })

    async function handleCreateProfileData(values: z.infer<typeof createProfileSchema>) {
        const isValid = createProfileSchema.safeParse(values)

        if (isValid.error) {
            const messages = isValid.error.issues
            toast({
                title: 'Невалидное имя',
                variant: 'destructive',
                description: messages.map(issue => issue.message).join(', ')
            })
        }

        if (isValid.success && state.userId) {
            await profileData.create(values, state.userId)
        }

        if (profileData.isErrorCreatePD) {
            toast({
                title: profileData.error?.title,
                variant: 'destructive',
                description: profileData.error?.message
            })

        }
    }

    if (profileData.isPending) {
        return <Loader />
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateProfileData)}
                className="flex flex-col items-center justify-center h-full gap-9">
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
                    <Button variant="default" className="bg-emerald-700" type="submit">Завершить регистрацию</Button>
                </div>
            </form>
        </Form>
    )
}