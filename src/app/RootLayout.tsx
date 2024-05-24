
import { ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable"
import { Outlet } from "react-router-dom"

const RootLayout = () => {


    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <Outlet />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default RootLayout