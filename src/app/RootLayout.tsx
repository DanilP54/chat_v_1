import { ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable";
import { Outlet } from "react-router-dom";
import { Providers } from "./providers";

const RootLayout = () => {
  return (
    <Providers>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Providers>
  );
};

export default RootLayout;
