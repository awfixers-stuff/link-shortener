import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MobileNotAllowedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center text-2xl">
      <div>404 - Mobile not allowed</div>
      <Link href="/" className="mt-8">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
