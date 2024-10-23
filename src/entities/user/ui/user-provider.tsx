// import { createContext, useContext, useEffect, useState } from "react";
// import { User } from "../user.model";
// import React from "react";
// import { ChatRoom } from "@/entities/chat-room/chat.room.model";
// import { useAuthContext } from "@/entities/session/ui/auth-provider";
// import { Loader } from "@/shared/ui/loader";
// import { useNavigate } from "react-router-dom";
// import { useGetUserProfile } from "../application/get.user.profile";


// type UserActions = {
//     getUserProfile(): User
//     getUserChatList(): any
//     updateUserStatus(status: UserStatus): void
// }


// const UserContext = createContext<UserActions | null>(null)

// export const useUserContext = () => {

//     const context = useContext(UserContext)

//     if (!context) {
//         throw new Error('useUserContenxt must be used within a UserProvider')
//     }

//     return context

// }

// type UserStatus = 'USER PROFILE LOADING' | 'USER PROFILE LOADED' | 'USER PROFILE NOT FOUND'

// export const UserProvider = ({ children }: {
//     children: React.ReactNode

// }) => {

//     const [userStatus, setUserStatus] = useState<UserStatus>('USER PROFILE LOADING')
//     const [userProfile, setUserProfile] = useState<User>()
//     const [userChatList, setUserChatList] = useState<ChatRoom[]>([])
    
//     console.log(userProfile)
//     console.log(userStatus)
    
//     const navigate = useNavigate()

//     const { getUserCredentials } = useAuthContext()

//     const getProfileUseCase = useGetUserProfile()


//     const getUserProfile = async () => {

//         const { id } = getUserCredentials()

//         try {
//             const profile = await getProfileUseCase.execute(id)

//             if (profile) {
//                 setUserProfile(profile)
//                 setUserStatus('USER PROFILE LOADED')
//             } else {
//                 setUserStatus('USER PROFILE NOT FOUND')
//                 navigate('/create-profile')
//             }


//         } catch (error) {
//             console.log(error)
//         }

//     }

//     useEffect(() => {

//         const isNotUserProfileLoading = userStatus === 'USER PROFILE LOADING'

//         if (isNotUserProfileLoading) {
//             getUserProfile()
//         } else {
//             return
//         }

//     }, [userStatus])


//     const userActions = {

//         getUserProfile() {

//             if (userStatus !== 'USER PROFILE LOADED' || !userProfile) {
//                 throw new Error('User profile is not loaded')
//             }

//             return userProfile
//         },

//         getUserChatList() {
//             return userChatList
//         },

//         updateUserStatus(status: UserStatus) {
//             setUserStatus(status)
//         }
//     }


//     return (
//         <>
//             <UserContext.Provider value={userActions}>
//                 {userStatus === 'USER PROFILE LOADING' ? <Loader /> : children}
//             </UserContext.Provider>
//         </>
//     )
// }




