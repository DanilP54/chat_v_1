import { ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable"
import { Outlet } from "react-router-dom"
import { Providers } from "./providers"
// import { routingAuthorization } from "@/app/authorization-state-machine/routing.authorization.tsx"
// import { useAuthState } from "@/entities/session"


// const StateMachine = () => {
//     const state = useAuthState()
//     return routingAuthorization(state, <Outlet />)
// }

const RootLayout = () => {
    return (
        <Providers>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <Outlet />
                </ResizablePanel>
            </ResizablePanelGroup>
        </Providers>
    )
}

export default RootLayout