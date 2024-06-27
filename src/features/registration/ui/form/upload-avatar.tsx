import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { viewerInfoSchema } from "../../lib/form-schema/viewer-info-schema";
import { Button } from "@/shared/ui/button";
import React, { useState } from "react";


interface UploadAvatarProps {
    field: ControllerRenderProps<z.infer<typeof viewerInfoSchema>, "avatar">;
}

const defaultAvatar: string = 'https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ginger'

export default function UploadAvatar({ field }: UploadAvatarProps) {

    const [uploadedAvatar, setUploadedAvatar] = useState<string>(defaultAvatar)
    console.log(uploadedAvatar)
    console.log(field.value)
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        field.onChange(file)
        if (file) {
            const a = URL.createObjectURL(file)
            setUploadedAvatar(a)
            console.log(a)
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