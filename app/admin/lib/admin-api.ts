export type NewsStatus = "Draft" | "Published" | "Archived";
export type ContactStatus = "New" | "InProgress" | "Resolved" | "Spam";
export type AdminLanguage = "ru" | "ky" | "en";

export type AdminUser = {
  id: string;
  email: string | null;
  displayName: string | null;
  createdAt: string;
  lastLoginAt: string | null;
};

export type LoginResponse = {
  admin: AdminUser;
  expiresAt: string;
  csrfToken: string | null;
};

export type NewsTranslation = {
  language: AdminLanguage;
  category: string;
  title: string;
  excerpt: string;
  content: string;
};

export type AdminNews = {
  id: string;
  slug: string;
  categoryKey: string;
  author: string | null;
  coverImageUrl: string | null;
  status: NewsStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  translations: NewsTranslation[] | null;
};

export type UpsertNews = Omit<
  AdminNews,
  "id" | "createdAt" | "updatedAt" | "translations"
> & {
  translations: NewsTranslation[];
};

export type ContactMessage = {
  id: string;
  name: string | null;
  email: string | null;
  message: string | null;
  language: string | null;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string | null;
};

export type PagedResult<T> = {
  items: T[] | null;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

const CSRF_STORAGE_KEY = "csrfToken";

export function getCsrfToken() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(CSRF_STORAGE_KEY);
}

export function setCsrfToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.sessionStorage.setItem(CSRF_STORAGE_KEY, token);
  else window.sessionStorage.removeItem(CSRF_STORAGE_KEY);
}

export async function adminRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;
  const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const csrfExempt = path === "/api/admin/auth/login";

  if (options.body && !isFormData && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  if (isMutation && !csrfExempt) {
    const token = getCsrfToken();
    if (!token) {
      throw new AdminApiError(
        403,
        "CSRF-токен отсутствует. Выйдите и войдите в панель повторно.",
      );
    }
    headers.set("X-CSRF-Token", token);
  }

  const response = await fetch(path, {
    ...options,
    method,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Не удалось выполнить запрос.";
    try {
      const payload = (await response.json()) as {
        detail?: string;
        error?: string;
        message?: string;
        title?: string;
      };
      message =
        payload.detail ?? payload.message ?? payload.error ?? payload.title ?? message;
    } catch {
      if (response.status === 401) message = "Сессия завершена. Войдите снова.";
      if (response.status === 403) message = "Запрос отклонён. Обновите страницу и повторите вход.";
    }
    if (
      typeof window !== "undefined" &&
      path !== "/api/admin/auth/login" &&
      (response.status === 401 || response.status === 403)
    ) {
      window.dispatchEvent(new CustomEvent("sabat-admin-session-invalid"));
    }
    throw new AdminApiError(response.status, message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function formatAdminDate(value: string | null, withTime = true) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

export const newsStatusLabels: Record<NewsStatus, string> = {
  Draft: "Черновик",
  Published: "Опубликовано",
  Archived: "В архиве",
};

export const contactStatusLabels: Record<ContactStatus, string> = {
  New: "Новое",
  InProgress: "В работе",
  Resolved: "Решено",
  Spam: "Спам",
};
