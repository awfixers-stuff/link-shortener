"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SidebarInput, useSidebar } from "./ui/sidebar";

export function SidebarOptInForm() {
  const { open } = useSidebar();

  return (
    <Card className={`mb-4 gap-2 py-4 shadow-none ${!open && "hidden"}`}>
      <CardHeader className="px-4">
        <CardTitle className="text-sm">
          Subscribe to the AWFixer Newsletter
        </CardTitle>
        <CardDescription>
          Opt-In to receive updates and news about AWFixer and our projects
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <form>
          <div className="5 grid gap-2">
            <SidebarInput type="email" placeholder="Email Address" />
            <Button
              className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
              size="sm"
              disabled
            >
              Subscribe
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
