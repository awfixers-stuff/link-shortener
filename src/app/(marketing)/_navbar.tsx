// components/Navbar.tsx
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  return (
    <nav className="bg-opacity-80 dark:bg-opacity-80 fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* Replace with your actual logo/SVG */}
          <span className="text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            AWFixer Links
          </span>
        </Link>
        <div className="flex items-center gap-3 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <ThemeSwitcher /> {/* Theme toggle here */}
          <Button
            type="button"
            className="rounded-md bg-indigo-600 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            asChild
          >
            <Link href="/auth/sign-in">Login</Link>
          </Button>
          {/* Hamburger menu for mobile - placeholder */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse dark:border-gray-700">
            <li>
              <Link
                href="#"
                className="block rounded px-3 py-2 text-indigo-700 md:bg-transparent md:p-0 dark:text-indigo-400"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-indigo-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-indigo-400"
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-indigo-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-indigo-400"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-indigo-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-indigo-400"
              >
                Resource
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
