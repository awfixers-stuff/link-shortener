"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function MobileRedirect() {
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        router.push("/mobile-404");
      }
    };

    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [router]);

  return null;
}
