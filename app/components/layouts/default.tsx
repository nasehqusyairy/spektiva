import { Outlet } from "react-router"
import { AppSidebar } from "~/components/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "~/components/ui/sidebar"

export default function DefaultLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
