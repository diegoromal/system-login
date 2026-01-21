"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SituatorEvent } from "@/services/situator-events.service";
import { useEffect, useMemo, useState } from "react";

type EventColumn = {
  key: keyof SituatorEvent;
  label: string;
  max: number;
};

type SituatorEventsTableProps = {
  events: SituatorEvent[];
  isLoading: boolean;
  savingId: string | null;
  error: string | null;
  onRefresh: () => Promise<void>;
  onSave: (event: SituatorEvent) => Promise<void>;
};

export function SituatorEventsTable({
  events,
  isLoading,
  savingId,
  error,
  onRefresh,
  onSave,
}: SituatorEventsTableProps) {
  const [drafts, setDrafts] = useState<Record<string, SituatorEvent>>({});

  useEffect(() => {
    const mapped = events.reduce<Record<string, SituatorEvent>>(
      (acc, item) => {
        acc[item.id] = item;
        return acc;
      },
      {}
    );
    setDrafts(mapped);
  }, [events]);

  const columns = useMemo(
    () =>
      [
        { key: "srcextension", label: "Src Extension", max: 10 },
        { key: "situatoraccountcode", label: "Account", max: 10 },
        { key: "situatorzonecode", label: "Zone", max: 10 },
        { key: "situatoreventcode", label: "Event", max: 10 },
        { key: "situatorpriority", label: "Priority", max: 10 },
        { key: "situatorcondominium", label: "Condominium", max: 100 },
      ] satisfies EventColumn[],
    []
  );

  const handleChange = (
    id: string,
    field: keyof SituatorEvent,
    value: string
  ) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    await onSave(draft);
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col gap-2 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Situator
          </p>
          <p className="text-lg font-semibold">Eventos EPV Segurança</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="w-full sm:w-auto"
        >
          Recarregar
        </Button>
      </div>

      {error && (
        <div className="border-b bg-destructive/5 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="md:hidden">
        {isLoading && (
          <p className="px-4 py-4 text-sm text-muted-foreground">
            Carregando eventos...
          </p>
        )}

        {!isLoading && events.length === 0 && (
          <p className="px-4 py-4 text-sm text-muted-foreground">
            Nenhum evento encontrado.
          </p>
        )}

        {!isLoading &&
          events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-3 border-b border-border/60 px-4 py-4 last:border-b-0"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  ID
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {event.id}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {columns.map((column) => (
                  <label key={column.key} className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {column.label}
                    </span>
                    <Input
                      value={drafts[event.id]?.[column.key] ?? ""}
                      maxLength={column.max}
                      onChange={(ev) =>
                        handleChange(event.id, column.key, ev.target.value)
                      }
                    />
                  </label>
                ))}
              </div>

              <Button
                size="sm"
                className="w-full"
                onClick={() => handleSave(event.id)}
                disabled={savingId === event.id}
              >
                {savingId === event.id ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="whitespace-nowrap p-3 text-left">ID</th>
              {columns.map((column) => (
                <th key={column.key} className="whitespace-nowrap p-3 text-left">
                  {column.label}
                </th>
              ))}
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="p-4 text-sm text-muted-foreground" colSpan={8}>
                  Carregando eventos...
                </td>
              </tr>
            )}

            {!isLoading && events.length === 0 && (
              <tr>
                <td className="p-4 text-sm text-muted-foreground" colSpan={8}>
                  Nenhum evento encontrado.
                </td>
              </tr>
            )}

            {!isLoading &&
              events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-border/60 text-sm last:border-b-0"
                >
                  <td className="whitespace-nowrap p-3 font-mono text-xs text-muted-foreground">
                    {event.id}
                  </td>
                  {columns.map((column) => (
                    <td key={column.key} className="p-3">
                      <Input
                        value={drafts[event.id]?.[column.key] ?? ""}
                        maxLength={column.max}
                        onChange={(ev) =>
                          handleChange(event.id, column.key, ev.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td className="p-3">
                    <Button
                      size="sm"
                      onClick={() => handleSave(event.id)}
                      disabled={savingId === event.id}
                    >
                      {savingId === event.id ? "Salvando..." : "Salvar"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
