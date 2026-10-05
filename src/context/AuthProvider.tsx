"use client";

import {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import { requestJson } from "../utils/requestJson";
import { authFetch } from "../api/authFetch";
import type { User } from "@/src/types";
import { getRoutes } from "../api/routes";
import { useAppConfig } from "../hooks/useAppConfig";

import { useRouter } from "next/navigation";
import { useTranslation } from "../hooks/useTranslation";
type AuthConfig = {
  use_local: boolean;
  use_cas: boolean;
  use_shibboleth: boolean;
  use_oidc: boolean;
};

type LogoutInfo = {
  local: string | null;
  cas: string | null;
  shibboleth: string | null;
  oidc: string | null;
};

type AuthContextValue = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: User | null;
  authConfig: AuthConfig | null;
  logoutUrl: string;
  isAuthDataLoading: boolean;
  logIn: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<string | null>;
  verify: () => Promise<boolean>;
  reloadAuthData: () => Promise<void>;
};
type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";

const getConfigFlag = (config: Record<string, unknown> | null, key: string) => {
  if (!config) return false;
  const lowerValue = config[key];
  if (typeof lowerValue === "boolean") return lowerValue;
  const upperValue = config[key.toUpperCase()];
  if (typeof upperValue === "boolean") return upperValue;
  return false;
};

const normalizeAuthConfig = (
  config: Record<string, unknown> | null,
): AuthConfig | null => {
  if (!config) return null;

  return {
    use_local: getConfigFlag(config, "use_local"),
    use_cas: getConfigFlag(config, "use_cas"),
    use_shibboleth: getConfigFlag(config, "use_shibboleth"),
    use_oidc: getConfigFlag(config, "use_oidc"),
  };
};

// Priorite: local > cas > shibboleth > oidc.
const resolveLogoutUrl = (
  config: AuthConfig | null,
  logoutInfo: LogoutInfo | null,
) => {
  if (!config || !logoutInfo) return "/";
  if (config.use_local) return logoutInfo.local || "/";
  if (config.use_cas) return logoutInfo.cas || "/";
  if (config.use_shibboleth) return logoutInfo.shibboleth || "/";
  if (config.use_oidc) return logoutInfo.oidc || "/";
  return "/";
};

export default function AuthProvider(props: AuthProviderProps) {
  const { config } = useAppConfig();

  // Next.js router used to redirect when the session expires.
  const router = useRouter();

  // Prevent the "session expired" logic from running multiple times
  // when several concurrent requests fail at the same time.
  const hasForcedLogoutRef = useRef(false);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [logoutInfo, setLogoutInfo] = useState<LogoutInfo | null>(null);
  const [isAuthDataLoading, setIsAuthDataLoading] = useState(false);

  // Derive this directly; no effect is needed.
  const authConfig = useMemo(
    () => normalizeAuthConfig((config as Record<string, unknown>) ?? null),
    [config],
  );

  const logoutUrl = useMemo(
    () => resolveLogoutUrl(authConfig, logoutInfo),
    [authConfig, logoutInfo],
  );

  const persistTokens = useCallback(
    (token: string | null, refreshValue: string | null) => {
      setAccessToken(token);
      setRefreshToken(refreshValue);

      // When saving new tokens (after login or a successful refresh),
      // reset the flag so a future session expiration can be detected.
      if (token && refreshValue) {
        hasForcedLogoutRef.current = false;
      }
      if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
      if (refreshValue) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshValue);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    persistTokens(null, null);
    setUser(null);
    setLogoutInfo(null);
  }, [persistTokens]);

  /**
   * Force logout and redirect to the login page when a session expiration
   * is detected (refresh failure).
   *
   * A ref prevents this logic from running multiple times when several
   * concurrent requests fail at the same time.
   */
  const forceLogoutAndRedirectToLogin = useCallback(() => {
    if (hasForcedLogoutRef.current) {
      return;
    }

    hasForcedLogoutRef.current = true;

    // Clear the local authentication state.
    logout();

    // Redirect to the login page while preserving the current page
    // so the user can return to it after signing in again.
    const currentPath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/";

    router.replace(
      `/login?reason=auth&redirect=${encodeURIComponent(currentPath)}`,
    );
  }, [logout, router]);

  const verify = useCallback(
    async (token?: string | null) => {
      const tokenToVerify = token ?? accessToken;
      if (!tokenToVerify) return false;
      try {
        await requestJson(getRoutes().auth.token.verify, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenToVerify }),
        });
        return true;
      } catch {
        return false;
      }
    },
    [accessToken],
  );

  const refresh = useCallback(
    async (token?: string | null) => {
      const tokenToRefresh = token ?? refreshToken;
      if (!tokenToRefresh) return null;
      try {
        const data = await requestJson<{ access: string }>(
          getRoutes().auth.token.refresh,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: tokenToRefresh }),
          },
        );
        const newAccess = data.access;
        persistTokens(newAccess, tokenToRefresh);
        return newAccess;
      } catch {
        // If the refresh fails (typically 401), we consider the session to be expired: we force logout and redirect the user to the login page.
        forceLogoutAndRedirectToLogin();
        return null;
      }
    },
    [forceLogoutAndRedirectToLogin, persistTokens, refreshToken],
  );

  const loadAuthDataWithToken = async (
    token: string,
    onRefresh?: () => Promise<string | null>,
  ) => {
    setIsAuthDataLoading(true);
    try {
      const [userRes, logoutInfoRes] = await Promise.all([
        authFetch(getRoutes().auth.user.data, {
          accessToken: token,
          onRefresh,
        }),
        authFetch(getRoutes().auth.user.logout, {
          accessToken: token,
          onRefresh,
        }),
      ]);

      const [userData, logoutInfoData] = await Promise.all([
        requestJson<User>(userRes),
        requestJson<LogoutInfo>(logoutInfoRes),
      ]);
      setUser(userData);
      setLogoutInfo(logoutInfoData);
    } catch {
      setUser(null);
      setLogoutInfo(null);
    } finally {
      setIsAuthDataLoading(false);
    }
  };

  const reloadAuthData = useCallback(async () => {
    if (!accessToken) {
      setUser(null);
      setLogoutInfo(null);
      return;
    }
    await loadAuthDataWithToken(accessToken, refresh);
  }, [accessToken, refresh]);

  useEffect(() => {
    const init = async () => {
      const storedAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
      const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);

      let validAccess: string | null = storedAccess;

      if (storedAccess) {
        const accessTokenIsValid = await verify(storedAccess);
        if (!accessTokenIsValid && storedRefresh) {
          validAccess = await refresh(storedRefresh);
          if (!validAccess) {
            setIsInitializing(false);
            return;
          }
        }
      } else if (storedRefresh) {
        validAccess = await refresh(storedRefresh);
      }

      if (validAccess) {
        await loadAuthDataWithToken(validAccess, () => refresh(storedRefresh));
      } else {
        setUser(null);
        setLogoutInfo(null);
      }

      setIsInitializing(false);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const logIn = async (username: string, password: string) => {
      const data = await requestJson<{ access: string; refresh: string }>(
        getRoutes().auth.token.create,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      persistTokens(data.access, data.refresh);
      await loadAuthDataWithToken(data.access, () => refresh(data.refresh));
    };

    return {
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken),
      isInitializing,
      user,
      authConfig,
      logoutUrl,
      isAuthDataLoading,
      logIn,
      logout,
      refresh,
      verify,
      reloadAuthData,
    };
  }, [
    accessToken,
    refreshToken,
    isInitializing,
    user,
    authConfig,
    logoutUrl,
    isAuthDataLoading,
    logout,
    refresh,
    verify,
    reloadAuthData,
    persistTokens,
  ]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { t } = useTranslation();
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(t("providers.auth"));
  }
  return ctx;
};
