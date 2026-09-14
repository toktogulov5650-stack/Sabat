"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  ApiError,
  apiRequest,
  formatNewsDate,
  resolveImageUrl,
  type Language,
  type NewsDetails,
} from "../../lib/api";
import { archiveCopy } from "../content";

const stateCopy = {
  ru: {
    loading: "Загружаем публикацию…",
    error: "Не удалось загрузить публикацию. Попробуйте ещё раз.",
    retry: "Повторить",
    notFoundTitle: "Новость не найдена",
    notFoundText: "Возможно, публикация была удалена или ссылка устарела.",
  },
  ky: {
    loading: "Жарыя жүктөлүүдө…",
    error: "Жарыяны жүктөө мүмкүн болгон жок. Кайра аракет кылыңыз.",
    retry: "Кайталоо",
    notFoundTitle: "Жаңылык табылган жок",
    notFoundText: "Жарыя өчүрүлгөн же шилтеме эскирген болушу мүмкүн.",
  },
  en: {
    loading: "Loading story…",
    error: "We couldn’t load this story. Please try again.",
    retry: "Try again",
    notFoundTitle: "Story not found",
    notFoundText: "The story may have been removed or the link may be out of date.",
  },
};

export function NewsStory({ slug }: { slug: string }) {
  const [language, setLanguage] = useState<Language>("ru");
  const [story, setStory] = useState<NewsDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;
    if (savedLanguage === "ru" || savedLanguage === "ky" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      setLanguage((event as CustomEvent<Language>).detail);
    };
    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () => window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStory() {
      setIsLoading(true);
      setErrorStatus(null);

      try {
        const result = await apiRequest<NewsDetails>(
          `/api/news/${encodeURIComponent(slug)}?lang=${language}`,
          { cache: "no-store", signal: controller.signal },
        );
        setStory(result);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setStory(null);
        setErrorStatus(requestError instanceof ApiError ? requestError.status : 500);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadStory();
    return () => controller.abort();
  }, [slug, language, requestVersion]);

  const page = archiveCopy[language];
  const states = stateCopy[language];

  if (isLoading) {
    return (
      <>
        <Header />
        <main id="main-content" className="news-story-state" role="status">
          <div className="container"><p>{states.loading}</p></div>
        </main>
        <Footer />
      </>
    );
  }

  if (errorStatus === 404) {
    return (
      <>
        <Header />
        <main id="main-content" className="not-found">
          <div className="container">
            <span className="error-code">404</span>
            <h1>{states.notFoundTitle}</h1>
            <p>{states.notFoundText}</p>
            <Link className="button button-primary" href="/news">
              {page.back} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!story || errorStatus) {
    return (
      <>
        <Header />
        <main id="main-content" className="news-story-state" role="alert">
          <div className="container">
            <p>{states.error}</p>
            <button type="button" onClick={() => setRequestVersion((value) => value + 1)}>{states.retry}</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const imageUrl = resolveImageUrl(story.coverImageUrl);
  const paragraphs = story.content
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <Header />
      <main id="main-content" className="news-story-page">
        <article>
          <header className="news-story-header">
            <div className="container">
              <div className="news-story-topline">
                <Link className="news-story-back" href="/news">← {page.back}</Link>
                <time dateTime={story.publishedAt}>{formatNewsDate(story.publishedAt, language)}</time>
              </div>
            </div>
          </header>
          <div className="container">
            <section className="news-story-newspaper" aria-label={story.title}>
              <div className="news-story-paper-grid">
                <div className="news-story-inline-photo tone-green" aria-hidden={!imageUrl}>
                  {imageUrl ? <img src={imageUrl} alt="" /> : <span>{page.imageLabel}</span>}
                </div>
                <div className="news-story-paper-copy">
                  <div className="news-editorial-meta">
                    {story.author ? <span>{story.author}</span> : null}
                  </div>
                  <h1>{story.title}</h1>
                  <p className="news-story-paper-intro">{story.excerpt}</p>
                  {paragraphs.slice(0, 2).map((paragraph, index) => (
                    <p key={`${index}-${paragraph}`}>{paragraph}</p>
                  ))}
                </div>
                {paragraphs.length > 2 ? (
                  <div className="news-story-continuation">
                    {paragraphs.slice(2).map((paragraph, index) => (
                      <p key={`${index}-${paragraph}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
