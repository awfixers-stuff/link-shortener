import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { SignUpForm } from "./_form";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { ref } = await searchParams;

  return (
    <Card className="z-50 mx-auto w-full max-w-md rounded-md rounded-t-none p-4 sm:p-6">
      <CardHeader>
        <div className="5 flex flex-col gap-0">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            <ArrowLeftIcon /> Back to Home
          </Link>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        </div>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-xs">
          Already have an account? <Link href="/auth/sign-in">Sign In</Link>
        </p>
        <SignUpForm referrer={ref ?? "/dashboard"} />
      </CardContent>
      <CardFooter className="px-0">
        <p className="text-muted-foreground text-xs">
          By signing up, you agree to the{" "}
          <Link href="/policies/terms">Terms of Service</Link> and{" "}
          <Link href="/policies/privacy">Privacy Policy</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
