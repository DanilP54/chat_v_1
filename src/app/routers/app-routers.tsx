import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "../RootLayout"
import { HomePage } from "@/pages/home";
import { ChatRoom } from "@/pages/chat-room";
import { ChatDetails } from "@/pages/chat-details";
import SignIn from "@/features/sign-in/ui/SignIn";
import { Signup } from "@/features/sign-up";

export function AppRouters() {

    const routers = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    path: 'signin',
                    element: <SignIn />,
                },
                {
                    path: 'signup',
                    element: <Signup />
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
    ])

    return (
        <RouterProvider router={routers} />
    )
}