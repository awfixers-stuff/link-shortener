"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/app/server/trpc/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface CreateLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export function CreateLinkDialog({
  open,
  onOpenChange,
  userId,
}: CreateLinkDialogProps) {
  const { refetch } = authClient.useSession();
  const router = useRouter();
  const utils = trpc.useUtils();
  const form = useForm({ defaultValues: { key: "", destination: "" } });
  const createLink = trpc.links.createLink.useMutation();

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = async (values: { key: string; destination: string }) => {
    try {
      await createLink.mutateAsync({ ...values, createdById: userId });
      refetch();
      onOpenChange(false);
      form.reset();
      toast.success("Successfully shortened your url");
      utils.links.getLinksByUserId.invalidate({ userId });
      router.refresh();
    } catch (e) {
      toast.error(
        "There was an issue creating your short link. Please try again!",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl px-4 py-2">
        <DialogHeader>
          <DialogTitle>Create Shortened Link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-fit space-y-4"
          >
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. my-link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {createLink.error && (
              <div className="text-destructive text-sm">
                {createLink.error.message}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={createLink.isPending}>
                {createLink.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
