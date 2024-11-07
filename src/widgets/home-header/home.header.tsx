import { ThemeToggle } from "@/features/theme-toggle"
import { Layout } from "./_ui/layout"
import { Menu } from "./_ui/menu"
import { StatusToggle } from "@/features/status-toggle/status.toggle"

export const HomeHeader = () => {
    return (
        <>
            <Layout
                menu={<Menu />}
                themeAction={<ThemeToggle />}
                statusAction={<StatusToggle />}
            />
        </>
    )
}