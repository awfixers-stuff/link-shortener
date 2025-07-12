import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

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
              placeholder="https://dribbble.com/Mailtumator"
              className="w-full flex-grow rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button className="flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none dark:focus:ring-offset-gray-900">
              Short Link
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Just fill and short your link to grow your business
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            {/* Placeholder for customer avatars */}
            <div className="flex -space-x-2 overflow-hidden">
              <Image
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900"
                src="/avatars/avatar1.jpg"
                alt="Customer 1"
                width={40}
                height={40}
              />
              <Image
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900"
                src="/avatars/avatar2.jpg"
                alt="Customer 2"
                width={40}
                height={40}
              />
              <Image
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900"
                src="/avatars/avatar3.jpg"
                alt="Customer 3"
                width={40}
                height={40}
              />
            </div>
            <div className="flex items-center text-yellow-400">
              {/* 5 star rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.914c.969 0 1.371 1.24.588 1.81l-3.974 2.887 1.519 4.674c.3.921-.755 1.688-1.539 1.144L12 17.5l-4.084 2.954c-.784.544-1.838-.223-1.539-1.144l1.519-4.674-3.974-2.887c-.783-.57-.381-1.81.588-1.81h4.914l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              4.0 <span className="font-medium">from 500+ reviews</span>
            </span>
          </div>
        </div>

        {/* Right Image/Dashboard Mockup Area */}
        <div className="mt-12 flex justify-center lg:mt-0 lg:w-1/2 lg:justify-end">
          <div className="relative w-full max-w-lg">
            <Image
              src="/dashboard-mockup-light.png" // Light mode image
              alt="URL Shortener Dashboard Mockup"
              width={800}
              height={600}
              className="hidden rounded-lg shadow-xl ring-1 ring-gray-900/5 dark:block" // Use dark mockup in dark mode
              priority
            />
            <Image
              src="/dashboard-mockup-dark.png" // Dark mode image
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
