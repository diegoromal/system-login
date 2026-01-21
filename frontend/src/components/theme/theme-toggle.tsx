"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkMode = useMemo(() => {
    const currentTheme = resolvedTheme ?? theme ?? "light";
    return currentTheme === "dark";
  }, [resolvedTheme, theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = isDarkMode ? "light" : "dark";
    setTheme(nextTheme);
  }, [isDarkMode, setTheme]);

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      aria-pressed={isDarkMode}
      aria-label={`Ativar modo ${isDarkMode ? "claro" : "escuro"}`}
      className={cn(
        "text-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={toggleTheme}
      disabled={!isMounted}
    >
      {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
