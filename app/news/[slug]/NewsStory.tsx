"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { newsItems } from "../../data/news";
import { archiveCopy, localizedNews, type Language } from "../content";

export function NewsStory({ slug }: { slug: string }) {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;
    if (savedLanguage === "ru" || savedLanguage === "ky" || savedLanguage === "en") setLanguage(savedLanguage);

    const handleLanguageChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () => window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  const source = newsItems.find((item) => item.slug === slug)!;
  const story = localizedNews[language][slug];
  const page = archiveCopy[language];

  return (
    <>
      <Header />
      <main id="main-content" className="news-story-page">
        <article>
          <header className="news-story-header">
            <div className="container">
              <div className="news-story-topline">
                <Link className="news-story-back" href="/news">← {page.back}</Link>
              </div>
            </div>
          </header>
          <div className="container">
            <section className="news-story-newspaper" aria-label={story.title}>
              <div className="news-story-paper-grid">
                <div className={`news-story-inline-photo tone-${source.tone}`} aria-hidden="true">
                  <span>{page.imageLabel}</span>
                </div>
                <div className="news-story-paper-copy">
                  <h1>{story.title}</h1>
                  <p className="news-story-paper-intro">{story.excerpt}</p>
                  <p>{story.body[0]}</p>
                  <p>{story.body[1]}</p>
                </div>
                <div className="news-story-continuation">
                  {story.body.slice(2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
