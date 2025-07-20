import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="flex flex-row px-8 py-2 bg-opacity-80 dark:bg-opacity-80 z-20 w-full border-t h-20 items-center justify-end border-gray-200 bg-white backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900">
      <Link href="/links">Links</Link>
    </footer>
  )
}