import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { newsItems } from "./data/news";

const principles = [
  {
    number: "01",
    title: "Доступ к знаниям",
    text: "Создаём образовательную среду, в которой каждый может учиться, развиваться и раскрывать способности.",
  },
  {
    number: "02",
    title: "Поддержка инициатив",
    text: "Помогаем идеям, которые делают обучение понятнее, ближе и полезнее для общества.",
  },
  {
    number: "03",
    title: "Сильное сообщество",
    text: "Объединяем учеников, педагогов и партнёров вокруг ценности непрерывного образования.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Образовательный фонд Sabat</span>
              <h1>Знания, которые становятся возможностями</h1>
              <p className="hero-lead">
                Мы создаём образовательные инициативы и поддерживаем людей,
                которые хотят учиться, развиваться и менять мир вокруг себя.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href="/about">
                  Узнать о фонде <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button-secondary" href="/contacts">
                  Связаться с нами
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-label="Ценности фонда Sabat">
              <div className="hero-mark">S</div>
              <p className="hero-quote">
                Образование начинается с любопытства и продолжается всю жизнь.
              </p>
              <div className="hero-tag">Учиться · Развиваться · Делиться</div>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow">Что для нас важно</span>
                <h2>Образование с человеческим смыслом</h2>
              </div>
              <p>
                Sabat помогает знаниям выходить за пределы аудитории и становиться
                опорой для личного и общественного развития.
              </p>
            </div>

            <div className="principles-grid">
              {principles.map((principle) => (
                <article className="principle-card" key={principle.number}>
                  <span className="card-number">{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading heading-with-link">
              <div>
                <span className="eyebrow">Новости</span>
                <h2>Последнее в Sabat</h2>
              </div>
              <Link className="text-link" href="/news">
                Все новости <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="news-grid">
              {newsItems.slice(0, 3).map((item) => (
                <NewsCard item={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section-cta">
          <div className="container cta-panel">
            <div>
              <span className="eyebrow eyebrow-light">Открыты к сотрудничеству</span>
              <h2>Давайте создавать возможности вместе</h2>
            </div>
            <Link className="button button-light" href="/contacts">
              Написать нам <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
