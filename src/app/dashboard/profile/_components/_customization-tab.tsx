"use client";

import { TabsContent } from "@/components/ui/tabs";
import { ColorSchemeDropdown } from "@/app/dashboard/profile/_components/_color-scheme-dropdown";

export function CustomizationTab() {
  return (
    <TabsContent value="customization">
      <div className="py-4 flex flex-row gap-2.5 items-center">
        <h2>Color Scheme</h2>
        <ColorSchemeDropdown />
      </div>
    </TabsContent>
  );
}
