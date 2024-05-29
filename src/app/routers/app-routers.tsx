import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "../RootLayout"
import { HomePage } from "@/pages/home";
import { ChatRoom } from "@/pages/chat-room";
import { ChatDetails } from "@/pages/chat-details";

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