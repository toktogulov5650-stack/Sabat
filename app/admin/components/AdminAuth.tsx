"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AdminApiError,
  adminRequest,
  getCsrfToken,
  setCsrfToken,
  type AdminUser,
  type LoginResponse,
} from "../lib/admin-api";

type AuthContextValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: AdminUser) => void;
};

const AdminAuthContext = createContext<AuthContextValue | null>(null);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return context;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let active = true;

    adminRequest<AdminUser>("/api/admin/auth/me")
      .then((admin) => {
        if (!active) return;
        setUser(admin);
        const hasCsrfToken = Boolean(getCsrfToken());
        if (isLoginPage && hasCsrfToken) router.replace("/admin");
        if (!isLoginPage && !hasCsrfToken) router.replace("/admin/login");
      })
      .catch((error) => {
        if (!active) return;
        setUser(null);
        if (error instanceof AdminApiError && error.status === 401 && !isLoginPage) {
          setCsrfToken(null);
          router.replace("/admin/login");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isLoginPage, router]);

  useEffect(() => {
    function handleInvalidSession() {
      setCsrfToken(null);
      setUser(null);
      router.replace("/admin/login");
    }

    window.addEventListener("sabat-admin-session-invalid", handleInvalidSession);
    return () => window.removeEventListener("sabat-admin-session-invalid", handleInvalidSession);
  }, [router]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await adminRequest<LoginResponse>("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setCsrfToken(result.csrfToken);
    setUser(result.admin);
    router.replace("/admin");
  }, [router]);

  const logout = useCallback(async () => {
    try {
      if (getCsrfToken()) {
        await adminRequest<void>("/api/admin/auth/logout", { method: "POST" });
      }
    } finally {
      setCsrfToken(null);
      setUser(null);
      router.replace("/admin/login");
    }
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, login, logout, updateUser: setUser }),
    [user, loading, login, logout],
  );

  if (loading) {
    return (
      <main className="admin-session-screen" aria-live="polite">
        <span className="admin-spinner" />
        <p>Проверяем сессию…</p>
      </main>
    );
  }

  if (!isLoginPage && !user) {
    return (
      <main className="admin-session-screen" aria-live="polite">
        <span className="admin-spinner" />
        <p>Переходим ко входу…</p>
      </main>
    );
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
