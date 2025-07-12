import { cn } from "@/lib/utils";

interface KeyboardShortcutProps {
  keys: string | string[];
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function KeyboardShortcut({
  keys,
  className,
  variant = "default",
  size = "md",
}: KeyboardShortcutProps) {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  const variants = {
    default: "bg-muted border border-border text-muted-foreground",
    outline: "border-2 border-border text-foreground bg-background",
    ghost: "bg-muted/50 text-muted-foreground border border-muted",
  };

  const sizes = {
    sm: "px-1.5 py-0.5 text-xs min-w-[1.5rem] h-6",
    md: "px-2 py-1 text-sm min-w-[2rem] h-7",
    lg: "px-2.5 py-1.5 text-base min-w-[2.5rem] h-8",
  };

  const separatorSizes = {
    sm: "mx-1 text-xs",
    md: "mx-1.5 text-sm",
    lg: "mx-2 text-base",
  };

  return (
    <div className={cn("inline-flex items-center", className)}>
      {keyArray.map((key, index) => (
        <div className="flex items-center" key={index}>
          <kbd
            className={cn(
              "inline-flex items-center justify-center rounded font-mono font-medium shadow-sm",
              variants[variant],
              sizes[size],
            )}
          >
            {key}
          </kbd>
          {index < keyArray.length - 1 && (
            <span className={cn("text-muted-foreground", separatorSizes[size])}>
              +
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
