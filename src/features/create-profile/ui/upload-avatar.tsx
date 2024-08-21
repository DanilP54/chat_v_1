import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar.tsx";
import {ControllerRenderProps} from "react-hook-form";
import {z} from "zod";
import {viewerInfoSchema} from "../../logic/form-schema/viewer-info-schema";
import {Button} from "@/shared/ui/button.tsx";
import React, {useRef, useState} from "react";
import {useUploadAvatar} from "@/entities/avatar/application/upload.avatar.ts";
import {useAuthState} from "@/entities/session";
import {StateCreateProfileData} from "@/shared/types";
import {getDownloadURL} from 'firebase/storage'

interface UploadAvatarProps {
    field: ControllerRenderProps<z.infer<typeof viewerInfoSchema>, "avatar">;
}

const defaultAvatar: string = 'https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ginger'

export default function UploadAvatar({field}: UploadAvatarProps) {

    const [uploadedAvatar, setUploadedAvatar] = useState<string>(defaultAvatar)
    const [isUploadingUrl, setIsUploadingUrl] = useState<boolean>(false)
    const [progress, setProgress] = useState<string>('')
    const imageRef = useRef<HTMLImageElement | null>(null)

    const state = useAuthState() as StateCreateProfileData

    const uploadingAvatar = useUploadAvatar()


    const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        let currentStorageRef: any;

        const file = e.target.files[0]

        uploadingAvatar.execute(file, state.current_user.user_id, {

            onProgress: (snapshot) => {
                setIsUploadingUrl(true)
                currentStorageRef = snapshot.ref
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
                setProgress(`${percentage}%`)
                console.log('Progress: ', percentage)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('paused')
                        break
                    case 'success':
                        console.log('success')
                }
            },

            onError: (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },

            onSuccess: () => {
                if (!currentStorageRef) return

                getDownloadURL(currentStorageRef).then(url => {

                    const newImage = new Image()
                    newImage.src = url

                    newImage.onload = function() {
                        console.log(1)
                        setUploadedAvatar(url)
                        setIsUploadingUrl(false)
                    }

                    newImage.onerror = function() {
                        console.error('Failed to load new image');
                        setIsUploadingUrl(false)
                    };



                })
            }
        })

        field.onChange(file)

    }

    return (
        <>
            <label htmlFor="avatar" className="flex flex-col items-center gap-4 cursor-pointer">
                {
                    isUploadingUrl ? `Загрузка:, ${progress}` :
                        <Avatar ref={imageRef} className="w-32 h-32 rounded-sm shadow-3xl">
                            <AvatarImage
                                src={uploadedAvatar}
                                alt="avatar"
                            />
                            <AvatarFallback>
                                Photo
                            </AvatarFallback>
                        </Avatar>

                }

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