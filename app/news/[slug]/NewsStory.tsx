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
              <Link className="news-story-back" href="/news">← {page.back}</Link>
              <div className="news-editorial-meta"><span>{story.category}</span><time>{story.date}</time></div>
              <h1>{story.title}</h1>
              <p>{story.excerpt}</p>
            </div>
          </header>
          <div className="container">
            <div className={`news-story-image tone-${source.tone}`} aria-hidden="true"><span>{page.imageLabel}</span></div>
            <div className="news-story-body"><p>{story.body}</p></div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
