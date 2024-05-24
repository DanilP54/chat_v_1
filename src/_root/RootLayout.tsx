import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
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