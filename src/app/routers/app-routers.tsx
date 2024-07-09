import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import { HomePage } from "@/pages/home";
import { ChatRoom } from "@/pages/chat-room";
import { ChatDetails } from "@/pages/chat-details";
import { SignIn } from "@/pages/sign-in";

const CreateProfile = () => {
    return 'ввод данных'
}

const routers = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: 'signin',
                element: <SignIn />
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
                path: 'chat/:id',
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