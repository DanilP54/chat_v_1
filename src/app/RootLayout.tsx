
import { ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable"
import { Outlet } from "react-router-dom"
import { Providers } from "./providers"
import { routingAuthStateMachine } from "./auth-state-machine/routing"
import { useAuthState } from "@/entities/session"


const StateMachine = () => {
    const state = useAuthState()
    console.log(state)
    return routingAuthStateMachine(state, <Outlet />)
}

const RootLayout = () => {



    return (
        <Providers>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <StateMachine />
                </ResizablePanel>
            </ResizablePanelGroup>
        </Providers>
    )
}

export default RootLayout