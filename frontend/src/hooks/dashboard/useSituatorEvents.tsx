"use client";

import { getAuthTokens } from "@/lib/auth-storage";
import {
  listSituatorEvents,
  SituatorEvent,
  updateSituatorEvent,
} from "@/services/situator-events.service";
import { useCallback, useEffect, useRef, useState } from "react";

export type UseSituatorEventsOutput = {
  events: SituatorEvent[];
  isLoading: boolean;
  savingId: string | null;
  error: string | null;
  refresh: () => Promise<void>;
  save: (event: SituatorEvent) => Promise<void>;
};

export function useSituatorEvents(): UseSituatorEventsOutput {
  const [events, setEvents] = useState<SituatorEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const authTokenRef = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    const tokens = getAuthTokens();
    if (!tokens?.authToken) {
      setError("Usuario nao autenticado");
      setIsLoading(false);
      return;
    }

    authTokenRef.current = tokens.authToken;
    setIsLoading(true);
    setError(null);
    try {
      const data = await listSituatorEvents(tokens.authToken);
      setEvents(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const save = useCallback(
    async (event: SituatorEvent) => {
      const token = authTokenRef.current;
      if (!token) {
        setError("Usuario nao autenticado");
        return;
      }

      setSavingId(event.id);
      setError(null);
      try {
        const updated = await updateSituatorEvent(token, event);
        setEvents((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
      } catch (err) {
        setError((err as Error).message);
        throw err;
      } finally {
        setSavingId(null);
      }
    },
    []
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { events, isLoading, savingId, error, refresh, save };
}
