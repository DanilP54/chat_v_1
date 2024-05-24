import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "../RootLayout"
import { HomePage } from "@/pages/home";
import { ChatRoom } from "@/pages/chat-room";

export function AppRouters() {

    const routers = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    path: 'home',
                    element: <HomePage />
                },
                {
                    path: 'chat/:id',
                    element: <ChatRoom />
                },
                // {
                //     path: 'userdetails',
                //     element: <UserDetails />
                // }
            ]
        },
    ])

    return (
        <RouterProvider router={routers} />
    )
}