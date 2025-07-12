import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { SignInForm } from "./_form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { ref } = await searchParams;

  return (
    <Card className="z-50 mx-auto w-full max-w-md rounded p-4 sm:p-6">
      <CardHeader>
        <div className="5 flex flex-col gap-0">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary flex gap-1 text-sm"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </Link>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        </div>
        <CardDescription className="text-xs md:text-sm">
          Enter your Email Address or Username to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-xs">
          {`Don't have an account? `} <Link href="/auth/sign-up">Sign Up</Link>
        </p>
        <SignInForm referrer={ref ?? "/dashboard"} />
      </CardContent>
    </Card>
  );
}
