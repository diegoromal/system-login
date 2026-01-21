"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type DashboardHeaderProps = {
  userEmail: string;
};

export function DashboardHeader({ userEmail }: DashboardHeaderProps) {
  const userInitial = userEmail?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-20 shadow-sm">
      <div className="bg-primary px-4 py-3 text-primary-foreground sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/10 text-base font-bold tracking-tight">
              SL
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold uppercase tracking-widest">
                Boards
              </p>
              <p className="text-xs text-primary-foreground/80">Dashboard</p>
            </div>
          </div>

          <div className="w-full md:flex-1">
            <div className="relative w-full md:max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/70" />
              <Input
                type="search"
                placeholder="Buscar quadros, membros..."
                className="h-10 w-full border-transparent bg-primary-foreground/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/70 shadow-none focus-visible:border-primary-foreground/60 focus-visible:ring-primary-foreground/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end md:gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Plus className="size-4" />
                Criar
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/20 focus-visible:ring-primary-foreground/50"
                aria-label="Notificacoes"
                type="button"
              >
                <Bell className="size-4" />
              </Button>
              <ThemeToggle className="text-primary-foreground hover:bg-primary-foreground/20 focus-visible:ring-primary-foreground/50" />
            </div>

            <div className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/25 text-sm font-semibold">
                {userInitial}
              </div>
              <div className="min-w-0 leading-tight">
                <p className="text-xs font-semibold uppercase tracking-wider">
                  Ola
                </p>
                <p className="max-w-[160px] truncate text-xs text-primary-foreground/80">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
