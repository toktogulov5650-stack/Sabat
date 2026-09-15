"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  apiRequest,
  formatNewsDate,
  resolveImageUrl,
  type Language,
  type NewsListItem,
  type NewsPage,
} from "../lib/api";
import { archiveCopy } from "./content";

const controlsCopy = {
  ru: {
    loading: "Загружаем публикации…",
    error: "Не удалось загрузить новости. Попробуйте ещё раз.",
    empty: "По вашему запросу публикаций не найдено.",
    retry: "Повторить",
    previousPage: "Предыдущая страница",
    nextPage: "Следующая страница",
    previousStory: "Предыдущая новость",
    nextStory: "Следующая новость",
    page: (current: number, total: number) => `Страница ${current} из ${total}`,
  },
  ky: {
    loading: "Жарыялар жүктөлүүдө…",
    error: "Жаңылыктарды жүктөө мүмкүн болгон жок. Кайра аракет кылыңыз.",
    empty: "Сурооңуз боюнча жарыя табылган жок.",
    retry: "Кайталоо",
    previousPage: "Мурунку барак",
    nextPage: "Кийинки барак",
    previousStory: "Мурунку жаңылык",
    nextStory: "Кийинки жаңылык",
    page: (current: number, total: number) => `${current} / ${total}-барак`,
  },
  en: {
    loading: "Loading stories…",
    error: "We couldn’t load the news. Please try again.",
    empty: "No stories match your search.",
    retry: "Try again",
    previousPage: "Previous page",
    nextPage: "Next page",
    previousStory: "Previous story",
    nextStory: "Next story",
    page: (current: number, total: number) => `Page ${current} of ${total}`,
  },
};

const fallbackTones = ["green", "light", "dark", "mint"];

function NewsImage({ item, className }: { item: NewsListItem; className: string }) {
  const imageUrl = resolveImageUrl(item.coverImageUrl);

  return (
    <div className={className} aria-hidden={!imageUrl}>
      {imageUrl ? <img src={imageUrl} alt="" loading="lazy" decoding="async" /> : null}
    </div>
  );
}

export function NewsArchive() {
  const [language, setLanguage] = useState<Language>("ru");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPage, setNewsPage] = useState<NewsPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);
  const [showcaseOffset, setShowcaseOffset] = useState(0);
  const [showcaseDirection, setShowcaseDirection] = useState<"previous" | "next" | null>(null);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;

    if (savedLanguage === "ru" || savedLanguage === "ky" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      setLanguage((event as CustomEvent<Language>).detail);
      setCurrentPage(1);
    };

    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () => window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams({
      lang: language,
      page: String(currentPage),
      pageSize: "12",
    });

    async function loadNews() {
      setIsLoading(true);
      setError(false);

      try {
        const result = await apiRequest<NewsPage>(`/api/news?${query.toString()}`, {
          signal: controller.signal,
        });
        setNewsPage(result);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setNewsPage(null);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadNews();
    return () => controller.abort();
  }, [language, currentPage, requestVersion]);

  const page = archiveCopy[language];
  const controls = controlsCopy[language];
  const stories = newsPage?.items ?? [];
  const showcaseSource = stories.slice(0, 3);
  const showcase = showcaseSource.map(
    (_, index) => showcaseSource[(index + showcaseOffset) % showcaseSource.length],
  );
  const latest = stories.slice(3);

  function moveShowcase(direction: "previous" | "next") {
    setShowcaseDirection(direction);
    setShowcaseOffset((value) =>
      direction === "previous"
        ? (value - 1 + showcaseSource.length) % showcaseSource.length
        : (value + 1) % showcaseSource.length,
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="news-editorial">
        <section className="news-editorial-hero">
          <div className="container">
            <div className="news-editorial-intro">
              <h1>{page.title}</h1>
              <p>{page.intro}</p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <p className="container news-archive-status" role="status">{controls.loading}</p>
        ) : error ? (
          <div className="container news-archive-status" role="alert">
            <p>{controls.error}</p>
            <button type="button" onClick={() => setRequestVersion((value) => value + 1)}>{controls.retry}</button>
          </div>
        ) : stories.length === 0 ? (
          <p className="container news-archive-status">{controls.empty}</p>
        ) : (
          <>
            <section className="news-showcase" aria-label={page.latest}>
              <div
                className={`container news-grid news-showcase-grid news-carousel-grid${showcaseDirection ? ` is-${showcaseDirection}` : ""}`}
                key={showcaseOffset}
              >
                {showcase.map((item, index) => (
                  <Link
                    className={`news-card news-showcase-card ${index === 0 ? "featured" : "compact"}`}
                    href={`/news/${item.slug}`}
                    id={`news-showcase-${index + 1}`}
                    key={item.id}
                  >
                    <NewsImage item={item} className="news-image-placeholder" />
                    <h3>{item.title}</h3>
                    <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt, language)}</time>
                  </Link>
                ))}
              </div>
              {showcaseSource.length > 1 ? (
                <div className="news-showcase-controls">
                  <button
                    type="button"
                    aria-label={controls.previousStory}
                    onClick={() => moveShowcase("previous")}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label={controls.nextStory}
                    onClick={() => moveShowcase("next")}
                  >
                    ›
                  </button>
                </div>
              ) : null}
            </section>

            {latest.length > 0 ? (
              <section className="news-latest" aria-labelledby="latest-news-title">
                <div className="container">
                  <div className="news-latest-heading">
                    <h2 id="latest-news-title">{page.latest}</h2>
                  </div>
                  <div className="news-editorial-list">
                    {latest.map((item, index) => (
                      <Link className="news-editorial-row" href={`/news/${item.slug}`} key={item.id}>
                        <NewsImage item={item} className={`news-editorial-thumb tone-${fallbackTones[index % fallbackTones.length]}`} />
                        <div className="news-editorial-row-copy">
                          <div className="news-editorial-meta">
                            <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt, language)}</time>
                          </div>
                          <h3>{item.title}</h3>
                          <p>{item.excerpt}</p>
                        </div>
                        <span className="news-editorial-arrow" aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {newsPage && newsPage.totalPages > 1 ? (
              <nav className="container news-pagination" aria-label={controls.page(newsPage.page, newsPage.totalPages)}>
                <button
                  type="button"
                  onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
                  disabled={newsPage.page <= 1}
                  aria-label={controls.previousPage}
                >
                  ←
                </button>
                <span>{controls.page(newsPage.page, newsPage.totalPages)}</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((value) => Math.min(newsPage.totalPages, value + 1))}
                  disabled={newsPage.page >= newsPage.totalPages}
                  aria-label={controls.nextPage}
                >
                  →
                </button>
              </nav>
            ) : null}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
