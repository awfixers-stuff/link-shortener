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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { off } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
  const [image, setImage] = useState<File | null>(null);

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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    let img = "";

    if (image) {
      img = await convertFileToBase64(image);
    }

    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        username: data.username,
        name: `${data.firstName} ${data.lastName}`,
        image: img,
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
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile Preview"
                className="object-cover"
                fill
              />
            ) : (
              <UserIcon className="size-10 text-black" />
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              document.getElementById("profile-image-input")?.click()
            }
          >
            {imagePreview ? "Change Image" : "Add Profile Image"}
          </Button>
          {imagePreview && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-1 text-red-500"
              onClick={() => {
                form.setValue("image", "");
                setImage(null);
                setImagePreview(null);
              }}
            >
              Remove
            </Button>
          )}
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
                    handleImageChange(e);
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
