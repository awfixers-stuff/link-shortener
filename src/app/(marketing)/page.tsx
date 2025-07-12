import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketingHomePage() {
  return (
    <main className="mx-auto max-w-screen-xl flex-grow px-4 pt-24 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center gap-8 py-12 md:py-20 lg:flex-row lg:justify-between">
        {/* Left Content Area */}
        <div className="text-center lg:w-1/2 lg:text-left">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
            Let's make with simply one click.
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
            ALL IN ONE TOOLS
            <br />
            FOR YOUR LINKS
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 lg:mx-0 dark:text-gray-300">
            On a single platform, you'll find all the tools you need to connect
            audiences worldwide, manage links and QR Codes, and create brand
            relationships.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <input
              type="text"
              placeholder="https://futdrafts.com"
              className="w-full flex-grow rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <Button
              asChild
              className="flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none dark:focus:ring-offset-gray-900"
            >
              <Link href="/auth/sign-in?ref=/dashboard">
                Short Link
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Just fill and short your link to grow your business
          </p>
        </div>

        {/* Right Image/Dashboard Mockup Area */}
        <div className="mt-12 flex justify-center lg:mt-0 lg:w-1/2 lg:justify-end">
          <div className="relative w-full max-w-lg">
            <Image
              src="https://ef2gxidd9t.ufs.sh/f/ETlTZMbDvDzGj0d7cJCkBlIhTapide9GNwDEvWRqYySL05mb" // Light mode image
              alt="URL Shortener Dashboard Mockup"
              width={800}
              height={600}
              className="hidden rounded-lg shadow-xl ring-1 ring-gray-900/5 dark:block" // Use dark mockup in dark mode
              priority
            />
            <Image
              src="https://ef2gxidd9t.ufs.sh/f/ETlTZMbDvDzGbQ5wMmkviTQkJcYzlS7Z8APbhNVtxBpXHwn0" // Dark mode image
              alt="URL Shortener Dashboard Mockup"
              width={800}
              height={600}
              className="block rounded-lg shadow-xl ring-1 ring-gray-900/5 dark:hidden" // Use light mockup in light mode
              priority
            />
          </div>
        </div>
      </section>

      {/* Clients Logo Section */}
      {/* <section className="py-12">
          <LogoClients />
        </section> */}
    </main>
  );
}
