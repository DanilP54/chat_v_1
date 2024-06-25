import { FirstNameInput, LastNameInput, UploadAvatar } from "@/features/registration";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";


export default function ViewerInfoForm() {


    return (
        <Form>
            <form action="" className="flex flex-col items-center justify-center h-full gap-9">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <UploadAvatar />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3 w-2/3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FirstNameInput />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <LastNameInput />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <Button type="submit">Далее</Button>
                </div>
            </form>
        </Form>
    )
}