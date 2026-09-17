const API_URL = (
  process.env.SABAT_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://sabat-api-903514828590.us-east1.run.app"
).replace(/\/$/, "");

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function forwardRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(`/${path.map(encodeURIComponent).join("/")}`, API_URL);
  targetUrl.search = incomingUrl.search;
  const cacheableNewsRequest = request.method === "GET" && path[0] === "api" && path[1] === "news";

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");
  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(10_000)]),
      body: request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer(),
    });

    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");
    const retryAfter = response.headers.get("retry-after");
    if (responseContentType) responseHeaders.set("content-type", responseContentType);
    if (retryAfter) responseHeaders.set("retry-after", retryAfter);
    if (cacheableNewsRequest && response.ok) {
      responseHeaders.set(
        "cache-control",
        "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      );
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[api/backend] Failed to reach upstream API:", targetUrl.href, error);
    const detail = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        message: "The API is temporarily unavailable.",
        ...(process.env.NODE_ENV === "development" ? { detail } : {}),
      },
      { status: 502 },
    );
  }
}

export const GET = forwardRequest;
export const POST = forwardRequest;
