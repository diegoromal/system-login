"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { SituatorEventsTable } from "@/components/dashboard/situator-events-table";
import { useSituatorEvents } from "@/hooks/dashboard/useSituatorEvents";

export default function DashboardPage() {
  const { user, isLoading, error } = useDashboard();
  const {
    events,
    isLoading: isLoadingEvents,
    error: eventsError,
    savingId,
    refresh,
    save,
  } = useSituatorEvents();
  const headerEmail = user?.email ?? "Visitante";

  return (
    <div className="min-h-screen">
      <DashboardHeader userEmail={headerEmail} />
      {isLoading && (
        <div className="px-4 pt-4 text-sm text-muted-foreground sm:px-6">
          Carregando seus dados...
        </div>
      )}
      {error && (
        <div className="px-4 pt-4 text-sm text-destructive sm:px-6">
          {error}
        </div>
      )}
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
        <SituatorEventsTable
          events={events}
          isLoading={isLoadingEvents}
          savingId={savingId}
          error={eventsError}
          onRefresh={refresh}
          onSave={save}
        />
      </section>
    </div>
  );
}
