import React, {useState} from "react";
import {getDownloadURL} from "firebase/storage";

const defaultAvatar = 'https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ginger'

type Obj = {
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    avatarUrl: string
    isUploadingAvatar: boolean
    uploadingPercentage: string
}

export function useHandleUploadAvatar(avatarService: any, state: any): Obj {

    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
    const [uploadingPercentage, setUploadingPercentage] = useState('')


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files[0]

        if (!file) {
            return
        }

        let currentStorageRef: any;

        avatarService.execute(file, state.current_user.user_id, {
            onProgress: (snapshot) => {

                setIsUploadingAvatar(true)

                currentStorageRef = snapshot.ref

                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)

                setUploadingPercentage(`${percentage}%`)

                switch (snapshot.state) {
                    case 'paused':
                        setIsUploadingAvatar(false)
                        break;
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

                // Внедрить зависимость через абстракцию

                getDownloadURL(currentStorageRef)
                    .then(url => {

                        const newImage = new Image()

                        newImage.src = url

                        newImage.onload = function () {
                            setAvatarUrl(url)
                        }

                        newImage.onerror = function () {
                            console.error('Failed to load new image');
                        };
                    })
                    .finally(() => setIsUploadingAvatar(false))
            }
        })
    }


    return {
        handleOnChange,
        avatarUrl,
        isUploadingAvatar,
        uploadingPercentage
    }


}