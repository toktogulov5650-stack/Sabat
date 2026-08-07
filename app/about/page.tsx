import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "О нас",
  description: "Миссия, ценности и подход образовательного фонда Sabat.",
};

const values = [
  ["Открытость", "Говорим понятно, слушаем внимательно и создаём пространство для разных взглядов."],
  ["Развитие", "Верим в обучение на протяжении всей жизни и поддерживаем стремление двигаться вперёд."],
  ["Ответственность", "Относимся внимательно к людям, ресурсам и результатам каждой инициативы."],
  ["Сотрудничество", "Объединяем опыт и усилия, потому что большие изменения создаются вместе."],
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-hero section">
          <div className="container narrow-hero">
            <span className="eyebrow">О фонде</span>
            <h1>Мы верим в силу знаний и людей</h1>
            <p>
              Sabat — образовательный фонд, который создаёт возможности для
              обучения, поддерживает полезные инициативы и объединяет сообщество.
            </p>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container mission-grid">
            <div className="mission-label">Наша миссия</div>
            <div>
              <h2>Делать качественное образование ближе и понятнее</h2>
              <p>
                Мы хотим, чтобы знания становились реальным инструментом развития —
                помогали людям увереннее принимать решения, находить своё направление
                и вносить вклад в общество.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Наши ценности</span>
              <h2>То, на что мы опираемся</h2>
            </div>
            <div className="values-grid">
              {values.map(([title, text], index) => (
                <article className="value-card" key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container approach-panel">
            <span className="eyebrow eyebrow-light">Наш подход</span>
            <div className="approach-copy">
              <h2>Сначала понимаем потребность. Затем создаём решение.</h2>
              <p>
                Мы работаем последовательно: изучаем контекст, привлекаем экспертов,
                запускаем понятный формат и улучшаем его на основе обратной связи.
              </p>
              <Link className="button button-light" href="/contacts">
                Предложить сотрудничество <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
