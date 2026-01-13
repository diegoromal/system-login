export type AuthTokens = {
  authToken: string;
  refreshToken: string;
};

const AUTH_TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const isBrowser = () => typeof window !== "undefined";

export function setAuthTokens(tokens: AuthTokens): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, tokens.authToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function getAuthTokens(): AuthTokens | null {
  if (!isBrowser()) {
    return null;
  }

  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!authToken || !refreshToken) {
    return null;
  }

  return {
    authToken,
    refreshToken,
  };
}

export function clearAuthTokens(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
