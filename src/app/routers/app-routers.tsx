import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import { HomePage } from "@/pages/home";
import { ChatRoom } from "@/pages/chat-room";
import { ChatDetails } from "@/pages/chat-details";
import { AuthenticationPage } from "@/pages/authentication-page";
import { CreateProfile } from "@/pages/create-profile";

const routers = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: 'sign-in',
                element: <AuthenticationPage />
            },
            {
                path: 'create-profile',
                element: <CreateProfile />

            },
            {
                path: 'home',
                element: <HomePage />

            },
            {
                path: 'chat-room/:id',
                element: <ChatRoom />
            },
            {
                path: 'chatdetails/:id',
                element: <ChatDetails />
            }
        ]
    },
]


export function AppRouters() {
    const router = createBrowserRouter(routers)
    return <RouterProvider router={router} />
}