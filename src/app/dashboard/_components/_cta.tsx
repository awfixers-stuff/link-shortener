"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateLinkDialog } from "./_create-link-dialog";
import { PlusIcon } from "lucide-react";

export function CreateLinkCTA({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="secondary"
        className="bg-indigo-600 text-white opacity-80 hover:cursor-pointer hover:border hover:border-neutral-300"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="mr-1 size-4 text-white" />
        Shorten URL
      </Button>
      <CreateLinkDialog open={open} onOpenChange={setOpen} userId={userId} />
    </div>
  );
}
