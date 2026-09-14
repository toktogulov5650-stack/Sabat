const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function forwardRequest(request: Request, context: RouteContext) {
  if (!API_URL) {
    return Response.json(
      { message: "The public API address is not configured." },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(`/${path.map(encodeURIComponent).join("/")}`, API_URL);
  targetUrl.search = incomingUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");
  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer(),
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");
    const retryAfter = response.headers.get("retry-after");
    if (responseContentType) responseHeaders.set("content-type", responseContentType);
    if (retryAfter) responseHeaders.set("retry-after", retryAfter);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { message: "The API is temporarily unavailable." },
      { status: 502 },
    );
  }
}

export const GET = forwardRequest;
export const POST = forwardRequest;
