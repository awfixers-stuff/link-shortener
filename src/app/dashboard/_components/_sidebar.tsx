import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@/components/user-button";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="flex items-center justify-center"
    >
      <SidebarHeader className="group-data-[collapsible=icon]:self-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className={`loading-none flex flex-col gap-0.5`}>
                  <span className="font-medium">AWFixer Link</span>
                  <span>v0.0.1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="self-center">
        <SidebarOptInForm />
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
