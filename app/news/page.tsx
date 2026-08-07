import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NewsCard } from "../components/NewsCard";
import { newsItems } from "../data/news";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости, события и полезные материалы образовательного фонда Sabat.",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="inner-hero news-page-hero section">
          <div className="container">
            <span className="section-index">/ События · Идеи · Материалы</span>
            <h1>НОВОСТИ<br />И <em>ИСТОРИИ</em></h1>
            <div className="featured-news-visual">
              <Image src="/hero-students.jpg" alt="Студенты в аудитории" fill sizes="100vw" priority />
              <div className="hero-shade" />
              <div>
                <span>Главное</span>
                <h2>Открываем новый образовательный сезон</h2>
                <p>Новые форматы встреч, практические занятия и больше возможностей учиться вместе.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section news-list-section">
          <div className="container">
            <div className="news-filter-row">
              <span>Все публикации</span>
              <span>2026</span>
            </div>
            <div className="news-grid news-grid-full">
              {newsItems.map((item) => (
                <div id={item.slug} key={item.slug}><NewsCard item={item} detailed /></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
