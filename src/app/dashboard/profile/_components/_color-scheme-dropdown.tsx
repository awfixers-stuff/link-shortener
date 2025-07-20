'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/providers/color-scheme-provider";
import { CheckIcon } from "lucide-react";


export function ColorSchemeDropdown() {
  const { scheme, setScheme, schemes } = useColorScheme();
  const current = schemes.find((s) => s.key === scheme);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          {current?.label || "Color Scheme"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuRadioGroup value={scheme} onValueChange={setScheme}>
          {schemes.map((s) => (
            <DropdownMenuRadioItem key={s.key} value={s.key}>
              {s.label}
              {scheme === s.key && (
                <CheckIcon className="text-primary ml-auto h-4 w-4" />
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}