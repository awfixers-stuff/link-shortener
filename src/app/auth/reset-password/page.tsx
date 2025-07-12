"use client";

import {
  redirect,
  RedirectType,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const error = searchParams.get("error");
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!token) redirect("/auth/sign-in", RedirectType.push);

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    setIsLoading(true);

    try {
      await authClient.resetPassword(
        {
          newPassword: values.password,
          token: token as string,
        },
        {
          onSuccess(context) {
            setIsLoading(false);
            toast.success(
              "Successfully reset your password. Redirecting you to sign in.",
            );
            router.push("/auth/sign-in");
          },
          onError(context) {
            setIsLoading(false);
            toast.error("Failed to reset password.", {
              description: context.error.message,
            });
          },
        },
      );
    } catch (error) {
      console.error("[AUTH][RESET PASSWORD]: ", error);
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Suspense>
      <div className="container mx-auto max-w-md py-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Reset your password</h1>
            <p className="text-gray-500">Enter your new password below.</p>
          </div>

          {error && (
            <div className="rounded-md bg-red-100 p-3 text-red-600">
              {decodeURIComponent(error)}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Suspense>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
