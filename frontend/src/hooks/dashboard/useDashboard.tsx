"use client";

import { clearAuthTokens, getAuthTokens } from "@/lib/auth-storage";
import { fetchCurrentUser, MeServiceOutput } from "@/services/me.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type UseDashboardOutput = {
  user: MeServiceOutput | null;
  isLoading: boolean;
  error: string | null;
};

export function useDashboard(): UseDashboardOutput {
  const router = useRouter();
  const [user, setUser] = useState<MeServiceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokens = getAuthTokens();

    if (!tokens?.authToken) {
      setError("Usuário não autenticado");
      router.replace("/");
      setIsLoading(false);
      return;
    }

    const authToken = tokens.authToken;
    let isMounted = true;

    async function loadUser() {
      try {
        const result = await fetchCurrentUser(authToken);
        if (isMounted) {
          setUser(result);
        }
      } catch (err) {
        const errorMessage = (err as Error).message;
        if (isMounted) {
          setError(errorMessage);
        }
        clearAuthTokens();
        router.replace("/");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return { user, isLoading, error };
}
