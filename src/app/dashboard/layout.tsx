import { MobileRedirect } from "@/components/mobile-redirect";
import { DashboardSidebar } from "./_components/_sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies, headers } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { DynamicBreadcrumb } from "./_components/_dynamic-breadcrumb";
import { Button } from "@/components/ui/button";
import { CreateLinkCTA } from "./_components/_cta";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    redirect("/auth/sign-in?ref=/dashboard");
  }

  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("awfixer.sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* <div className="container"> */}
      <MobileRedirect />

      {/* <div className="mx-8 my-4 flex h-full w-full flex-row items-center justify-center gap-3"> */}
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex h-full items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
          <CreateLinkCTA userId={session.user.id} />
        </header>
        {children}
      </SidebarInset>
      {/* </div> */}
      {/* </div> */}
    </SidebarProvider>
  );
}
