import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import ChatListPage from "@/pages/chat-list/chat-list";
// import { ChatRoom } from "@/pages/chat-room";
// import { ChatDetails } from "@/pages/chat-details";
import { CreateProfilePage } from "@/pages/create-profile";
// import { SearchPage } from "@/pages/new-chat/ui/search.page.tsx";
import { TwoFactorAuthPage } from "@/features/auth/two-factor-auth";
import AuthenticationLayout from "@/pages/auth/layout";

const routers = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ChatListPage />,
      },
      // {
      //   path: "convo/:id",
      //   element: <ChatRoom />,
      // },
      // {
      //   path: "chat-info/:id",
      //   element: <ChatDetails />,
      // },
      {
        path: "create-profile",
        element: <CreateProfilePage />,
      },
      // {
      //   path: "search",
      //   element: <SearchPage />,
      // },
      {
        path: "auth",
        element: <AuthenticationLayout />,
        children: [
          {
            index: true,
            element: <TwoFactorAuthPage />,
          },
        ],
      },
    ],
  },
];

export function AppRouters() {
  const router = createBrowserRouter(routers);
  return <RouterProvider router={router} />;
}
