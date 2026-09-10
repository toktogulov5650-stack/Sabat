"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { newsItems } from "../data/news";
import { archiveCopy, localizedNews, type Language } from "./content";

export function NewsArchive() {
  const [language, setLanguage] = useState<Language>("ru");

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

  const page = archiveCopy[language];
  const stories = newsItems.map((item) => ({
    ...item,
    ...localizedNews[language][item.slug],
  }));
  const [featured, ...latest] = stories;

  return (
    <>
      <Header />
      <main id="main-content" className="news-editorial">
        <section className="news-editorial-hero">
          <div className="container">
            <span className="news-editorial-page-title">{page.pageTitle}</span>
            <div className="news-editorial-intro">
              <h1>{page.title}</h1>
              <p>{page.intro}</p>
            </div>
          </div>
        </section>

        <section className="news-featured-section" aria-labelledby="featured-news-title">
          <div className="container">
            <Link className="news-featured-story" href={`/news/${featured.slug}`}>
              <div className={`news-editorial-image tone-${featured.tone}`} aria-hidden="true">
                <span>{page.imageLabel}</span>
              </div>
              <div className="news-featured-copy">
                <div className="news-editorial-meta">
                  <span>{featured.category}</span>
                  <time>{featured.date}</time>
                </div>
                <h2 id="featured-news-title">{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="news-editorial-link">
                  {page.read} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="news-latest" aria-labelledby="latest-news-title">
          <div className="container">
            <div className="news-latest-heading">
              <h2 id="latest-news-title">{page.latest}</h2>
              <span>{String(latest.length).padStart(2, "0")}</span>
            </div>

            <div className="news-editorial-list">
              {latest.map((item, index) => (
                <Link className="news-editorial-row" href={`/news/${item.slug}`} key={item.slug}>
                  <span className="news-editorial-index">{String(index + 2).padStart(2, "0")}</span>
                  <div className={`news-editorial-thumb tone-${item.tone}`} aria-hidden="true" />
                  <div className="news-editorial-row-copy">
                    <div className="news-editorial-meta">
                      <span>{item.category}</span>
                      <time>{item.date}</time>
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
      </main>
      <Footer />
    </>
  );
}
