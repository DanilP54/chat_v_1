import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx";
import { ControllerRenderProps, useFormState } from "react-hook-form";
import { z } from "zod";
import { createProfileSchema } from "../lib/form-shema/create-profile-schema";
import { Button } from "@/shared/ui/button.tsx";
// import {useUploadAvatar} from "@/entities/avatar/application/upload.avatar.ts";
// import {useAuthState} from "@/entities/session";
// import {StateCreateProfileData} from "@/shared/types";
// import {useHandleUploadAvatar} from "@/features/create-profile/lib/hooks/useHandleUploadAvatar.ts";
import React, { useState } from "react";

interface UploadAvatarProps {
    field: ControllerRenderProps<z.infer<typeof createProfileSchema>, "avatar">;
}

const defaultAvatar = 'https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ginger'

export default function UploadAvatar({ field }: UploadAvatarProps) {

    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar)

    // const state = useAuthState() as StateCreateProfileData
    // const avatarUploadService = useUploadAvatar()

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            field.onChange(file)
            setAvatarUrl(URL.createObjectURL(file))
        }
    }

    return (
        <>
            <label htmlFor="avatar" className="flex flex-col items-center gap-4 cursor-pointer">
                <Avatar className="w-32 h-32 rounded-sm shadow-3xl">
                    <AvatarImage
                        src={avatarUrl}
                        alt="avatar"
                    />
                </Avatar>
                <Button
                    onClick={() => document.getElementById('avatar')?.click()}
                    type="button"
                    variant="noShadow"
                    className="hover:bg-gray-400 border bg-yellow-200 border-black px-4 py-[3px] h-8 text-black rounded-md text-sm"
                >Загрузить фото</Button>
                <input
                    id="avatar"
                    accept="image/*"
                    type="file"
                    className="hidden"
                    onChange={onChangeInput}
                />
            </label>
        </>
    )
}