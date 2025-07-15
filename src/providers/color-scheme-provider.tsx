"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const COLOR_SCHEMES = [
  {
    key: "violetBloom",
    label: "Violet Bloom",
  },
  { key: "doom64", label: "Doom 64" },
  { key: "caffeine", label: "Caffeine" },
  { key: "vercel", label: "Vercel" },
  { key: "twitter", label: "Twitter" },
];

interface ColorSchemeContextProps {
  scheme: string;
  setScheme: (scheme: string) => void;
  schemes: typeof COLOR_SCHEMES;
}

const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(
  undefined,
);

export const ColorSchemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [scheme, setSchemeState] = useState<string>("violetBloom");

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("color-scheme")
        : null;
    if (stored && COLOR_SCHEMES.some((s) => s.key === stored)) {
      setSchemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("color-scheme", scheme);

    // Remove both theme classes to reset
    document.documentElement.classList.remove("theme-doom64");
    document.documentElement.classList.remove("theme-caffeine");
    document.documentElement.classList.remove("theme-vercel");
    document.documentElement.classList.remove("theme-twitter");

    // Add the selected theme class if needed
    if (scheme === "doom64") {
      document.documentElement.classList.add("theme-doom64");
    }

    if (scheme === "caffeine") {
      document.documentElement.classList.add("theme-caffeine");
    }

    if (scheme === "vercel") {
      document.documentElement.classList.add("theme-vercel");
    }

    if (scheme === "twitter") {
      document.documentElement.classList.add("theme-twitter");
    }
    // For violetBloom, no extra class is needed (default)
  }, [scheme]);

  const setScheme = (s: string) => setSchemeState(s);

  return (
    <ColorSchemeContext.Provider
      value={{ scheme, setScheme, schemes: COLOR_SCHEMES }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx)
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  return ctx;
};
