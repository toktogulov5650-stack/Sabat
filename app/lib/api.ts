export type Language = "ru" | "ky" | "en";

export type NewsListItem = {
  id: string;
  slug: string;
  category: string;
  author: string | null;
  coverImageUrl: string | null;
  title: string;
  excerpt: string;
  publishedAt: string;
};

export type NewsPage = {
  items: NewsListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type NewsDetails = NewsListItem & {
  content: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "https://sabat-api-903514828590.us-east1.run.app"
).replace(/\/$/, "");
const API_PROXY_PATH = "/api/backend";

function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return API_URL;
    }
  }

  return API_PROXY_PATH;
}

const defaultErrorMessages: Record<number, string> = {
  400: "The request contains invalid data.",
  404: "The requested resource was not found.",
  429: "Too many requests. Please try again later.",
  500: "The server is temporarily unavailable.",
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = defaultErrorMessages[response.status] ?? "API request failed.";

    try {
      const payload = (await response.json()) as {
        error?: string;
        message?: string;
        title?: string;
      };
      message = payload.message ?? payload.error ?? payload.title ?? message;
    } catch {
      // Some error responses intentionally have no JSON body.
    }

    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

const dateLocales: Record<Language, string> = {
  ru: "ru-RU",
  ky: "ky-KG",
  en: "en-US",
};

export function formatNewsDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(dateLocales[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function resolveImageUrl(url: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (!API_URL) return null;

  return `${API_URL}${url.startsWith("/") ? url : `/${url}`}`;
}
