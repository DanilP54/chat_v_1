import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar.tsx";
import {ControllerRenderProps} from "react-hook-form";
import {z} from "zod";
import {viewerInfoSchema} from "../../logic/form-schema/viewer-info-schema";
import {Button} from "@/shared/ui/button.tsx";
import React, {useState} from "react";
import {useUploadAvatar} from "@/entities/avatar/application/upload.avatar.ts";
import {useAuthState} from "@/entities/session";
import {StateCreateProfileData} from "@/shared/types";


interface UploadAvatarProps {
    field: ControllerRenderProps<z.infer<typeof viewerInfoSchema>, "avatar">;
}

const defaultAvatar: string = 'https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ginger'

export default function UploadAvatar({field}: UploadAvatarProps) {

    const [uploadedAvatar, setUploadedAvatar] = useState<string>(defaultAvatar)
    const [progress, setProgress] = useState()

    const state = useAuthState() as StateCreateProfileData

    const uploadingAvatar = useUploadAvatar()



    const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {

            const file = e.target.files[0]

            const url = await uploadingAvatar.execute(file, state.current_user.user_id)
            console.log(url)
            setUploadedAvatar(url)
            console.log(file)

            field.onChange(file)

        }


        // setUploadedAvatar()
    }

    return (
        <>
            <label htmlFor="avatar" className="flex flex-col items-center gap-4 cursor-pointer">
                <Avatar className="w-32 h-32 rounded-sm shadow-3xl">
                    <AvatarImage
                        src={uploadedAvatar}
                        alt="avatar"
                    />
                    <AvatarFallback>
                        Photo
                    </AvatarFallback>
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
                    onChange={handleChangeInput}
                />
            </label>
        </>
    )
}