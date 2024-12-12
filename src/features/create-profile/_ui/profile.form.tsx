import { Input } from "@/shared/ui/input.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profileFormSchema } from "../_lib/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import AvatarField from "./avatar.field.tsx";
import { useCreateProfile } from "../_hooks/use.create.profile.ts";
import { FullPageLoader } from "@/shared/ui/full-page-loader.tsx";
import { User } from "@/entities/user/user.ts";
import { useNotfication } from "@/shared/lib/notification.ts";

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ user }: { user: User }) {
  const { showNotification } = useNotfication();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      avatar: null,
    },
    mode: "onSubmit",
  });

  const { createProfile, isPending } = useCreateProfile({
    onFailure: (error: Error) => {
      showNotification(
        {
          title: error.message,
        },
        "error",
      );
    },
  });

  const handleSubmit = form.handleSubmit(
    async (formData: ProfileFormValues) => {
      const parseResult = profileFormSchema.safeParse(formData);

      if (!parseResult.success) {
        return showNotification(
          {
            title: parseResult.error.message,
          },
          "error",
        );
      }

      createProfile({
        data: parseResult.data,
        user,
      });
    },
  );

  if (isPending) {
    return <FullPageLoader />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full gap-9"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarField onSuccess={field.onChange} value={field.value} />
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
                  <Input
                    className="bg-transparent outline-none rounded-none border-l-0 border-r-0 border-t-0 border-b-2 placeholder:text-gray-300 text-white"
                    type="text"
                    {...field}
                    placeholder="Введите имя"
                  />
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
                  <Input
                    className="bg-transparent outline-none rounded-none border-l-0 border-r-0 text-white placeholder:text-gray-300 border-t-0 border-b-2"
                    type="text"
                    {...field}
                    placeholder="Введите фамилию"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            variant="ghost"
            className="bg-cyan-900 p-6 text-white text-base font-bold"
            type="submit"
          >
            Отправить
          </Button>
        </div>
      </form>
    </Form>
  );
}
