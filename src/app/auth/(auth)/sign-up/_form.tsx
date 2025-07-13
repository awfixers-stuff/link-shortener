"use client";

import { Button } from "@/components/ui/button";
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
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First Name must be a minimum of 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Last Name must be a minimum of 3 characters" }),
    username: z
      .string()
      .min(6, { message: "Username must be a minimum of 6 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be a minimum of 8 character" }),
    passwordConfirmation: z
      .string()
      .min(8, { message: "Password must be a minimum of 8 characters " }),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export function SignUpForm({ referrer }: { referrer: string }) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      image: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
      username: "",
    },
  });

  // const convertFileToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (err) => reject(err);
  //   });
  // };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     setImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);

    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        username: data.username,
        name: `${data.firstName} ${data.lastName}`,
        image: image ?? undefined,
      },
      {
        onSuccess(context) {
          setLoading(false);
          toast.success("You have successfully registered");
          router.push(referrer);
        },
        onError(context) {
          setLoading(false);
          toast.error("An error occurred during registration", {
            description: context.error.message,
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="mb-4 flex flex-col items-center">
          <div className="relative mb-2 flex size-24 items-center justify-center overflow-hidden rounded-full border bg-gray-100">
            <Image
              src={
                imagePreview
                  ? imagePreview
                  : "https://ef2gxidd9t.ufs.sh/f/ETlTZMbDvDzGETZQPtJDvDzGNXHcTyMLsOkiBCqb70uYnmta"
              }
              alt="Profile Preview"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <UploadButton
              endpoint="imageUploader"
              disabled={loading}
              className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:shadow-xs ut-button:hover:bg-primary/90 ut-button:h-8 ut-button:gap-1.5 ut-button:rounded-md ut-button:p-0"
              onClientUploadComplete={(res) => {
                const imageURL = res[0].serverData.fileURL;
                setImagePreview(imageURL);
                setImage(imageURL);
                toast.success("Successfully Uploaded Profile Picture.");
              }}
              config={{
                cn: twMerge,
              }}
            />
            {!imagePreview && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-1 self-center text-red-500"
                onClick={async () => {
                  if (image) {
                    // Extract file key from UploadThing URL
                    const match = image.match(/\/f\/([^/?]+)/);
                    const key = match ? match[1] : null;

                    console.log("KEY", key);
                    if (key) {
                      try {
                        const res = await fetch("/server/api/uploadthing", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ key }),
                        });
                        if (!res.ok) {
                          const data = await res.json();
                          throw new Error(
                            data.error || "Failed to delete image",
                          );
                        }
                        toast.success("Profile image removed");
                      } catch (err) {
                        toast.error("Failed to remove image", {
                          description:
                            err instanceof Error ? err.message : undefined,
                        });
                      }
                    }
                  }
                  form.setValue("image", "");
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ada" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Lovelace" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="adalovelace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ada@lovelace.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
    </Form>
  );
}
