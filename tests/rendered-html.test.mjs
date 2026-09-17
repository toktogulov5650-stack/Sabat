import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Sabat homepage without a loading-only state", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Общественный фонд &quot;Сабат&quot;<\/title>/i);
  assert.match(
    html,
    /Настоящий профессионал начинается с настоящего человека\./,
  );
  assert.match(html, /Новый сезон проектов Общественного фонда &quot;Сабат&quot;/);
  assert.doesNotMatch(html, /Загружаем новости/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("server-renders the news archive with immediate content", async () => {
  const response = await render("/news");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Истории и идеи Общественного фонда &quot;Сабат&quot;/);
  assert.match(html, /Новый сезон проектов Общественного фонда &quot;Сабат&quot;/);
  assert.doesNotMatch(html, /Загружаем публикации/);
});
