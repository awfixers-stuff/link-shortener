"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signInSchema = z.object({
  identifier: z.string().min(4, "Email or Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export function SignInForm({ referrer }: { referrer: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const isEmail = data.identifier.includes("@");

    if (isEmail) {
      await authClient.signIn.email(
        {
          email: data.identifier,
          password: data.password,
          rememberMe: data.rememberMe,
        },
        {
          onSuccess() {
            setIsLoading(false);
            toast.success("Successfully Signed In");
            router.push(referrer);
          },
          onError(context) {
            setIsLoading(false);
            toast.error("Failed to Sign In", {
              description: context.error.message,
            });
          },
        },
      );
    } else {
      await authClient.signIn.username(
        {
          username: data.identifier,
          password: data.password,
          rememberMe: data.rememberMe,
        },
        {
          onSuccess() {
            setIsLoading(false);
            toast.success("Successfully Signed In");
            router.push(referrer);
          },
          onError(context) {
            setIsLoading(false);
            toast.error("Failed to Sign In", {
              description: context.error.message,
            });
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="ada@lovelace.com or alovelace"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setOpen(true)}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Button>
              </div>

              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Remember Me</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            "Login"
          )}
        </Button>

        {/* TODO: OAuth Button */}
      </form>
    </Form>
  );
}
