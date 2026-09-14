const BACKEND_URL = (
  process.env.SABAT_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://sabat-api-903514828590.us-east1.run.app"
).replace(/\/$/, "");

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const forwardedRequestHeaders = [
  "accept",
  "content-type",
  "cookie",
  "x-csrf-token",
] as const;

async function forwardAdminRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(
    `/api/admin/${path.map(encodeURIComponent).join("/")}`,
    BACKEND_URL,
  );
  targetUrl.search = incomingUrl.search;

  const headers = new Headers();
  for (const name of forwardedRequestHeaders) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers();
    for (const name of ["content-type", "retry-after", "location"]) {
      const value = response.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }

    const headersWithCookies = response.headers as Headers & {
      getSetCookie?: () => string[];
    };
    const cookies = headersWithCookies.getSetCookie?.() ?? [];
    if (cookies.length) {
      for (const cookie of cookies) responseHeaders.append("set-cookie", cookie);
    } else {
      const cookie = response.headers.get("set-cookie");
      if (cookie) responseHeaders.append("set-cookie", cookie);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { message: "Сервис временно недоступен. Попробуйте ещё раз." },
      { status: 502 },
    );
  }
}

export const GET = forwardAdminRequest;
export const POST = forwardAdminRequest;
export const PUT = forwardAdminRequest;
export const PATCH = forwardAdminRequest;
export const DELETE = forwardAdminRequest;

