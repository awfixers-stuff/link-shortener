"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items = [
    ...segments.map((seg, i) => {
      const href = segments.slice(0, i + 1).join("/");
      return { name: seg.charAt(0).toUpperCase() + seg.slice(1), href };
    }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center justify-center gap-1"
          >
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i !== items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
