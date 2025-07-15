"use client";

import KeyboardShortcut from "@/components/ui/keyboard-shortcut";
import { useState, useEffect } from "react";

function getCmdOrCtrl() {
  if (typeof window === "undefined") return "⌘";
  const platform = window.navigator.platform.toLowerCase();
  if (platform.includes("mac")) return "⌘";
  return "Ctrl";
}

export function KeyboardShortcuts() {
  const [cmdOrCtrl, setCmdOrCtrl] = useState("⌘");
  useEffect(() => {
    setCmdOrCtrl(getCmdOrCtrl());
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="text-md font-medium">Keyboard Shortcuts</div>
      <div className="flex flex-col gap-1 text-base">
        <div className="flex justify-between">
          <span>Toggle Sidebar</span>
          <KeyboardShortcut keys={[cmdOrCtrl, "B"]} />
        </div>
      </div>
    </div>
  );
}
