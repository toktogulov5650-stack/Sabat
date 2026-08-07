import type { Metadata } from "next";
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
        <section className="page-hero section news-hero">
          <div className="container narrow-hero">
            <span className="eyebrow">Новости Sabat</span>
            <h1>События, идеи и полезные материалы</h1>
            <p>Рассказываем о работе фонда и делимся тем, что помогает учиться и развиваться.</p>
          </div>
        </section>

        <section className="section news-list-section">
          <div className="container news-grid news-grid-full">
            {newsItems.map((item) => (
              <div id={item.slug} key={item.slug}>
                <NewsCard item={item} detailed />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
