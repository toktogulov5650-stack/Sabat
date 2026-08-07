import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "О нас",
  description: "Миссия, ценности и подход образовательного фонда Sabat.",
};

const values = [
  ["01", "Открытость", "Говорим понятно, слушаем внимательно и создаём пространство для разных взглядов."],
  ["02", "Развитие", "Поддерживаем стремление учиться, исследовать и уверенно двигаться вперёд."],
  ["03", "Ответственность", "Внимательно относимся к людям, ресурсам и результатам каждой инициативы."],
  ["04", "Сотрудничество", "Объединяем опыт и усилия, потому что большие изменения создаются вместе."],
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="inner-hero section">
          <div className="container">
            <span className="section-index">/ Sabat — образовательный фонд</span>
            <h1>МЫ ВЕРИМ<br />В СИЛУ <em>ЗНАНИЙ</em></h1>
            <div className="inner-hero-photo">
              <Image src="/study-group.jpg" alt="Участники образовательной программы" fill sizes="100vw" priority />
            </div>
          </div>
        </section>

        <section className="section about-mission">
          <div className="container statement-grid">
            <span className="section-index">/ 01 — Миссия</span>
            <div>
              <h2>Делать качественное образование <em>ближе и понятнее</em></h2>
              <div className="statement-footer">
                <p>
                  Мы хотим, чтобы знания становились реальным инструментом развития —
                  помогали людям увереннее принимать решения, находить своё направление
                  и вносить вклад в общество.
                </p>
                <p>
                  Поэтому мы соединяем содержание, практику и сообщество в одном
                  образовательном опыте.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="editorial-heading">
              <span className="section-index">/ 02 — Ценности</span>
              <h2>То, на что<br />мы <em>опираемся</em></h2>
            </div>
            <div className="values-editorial-grid">
              {values.map(([number, title, text]) => (
                <article className="editorial-value" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container image-text-split">
            <div className="split-image">
              <Image src="/students-classroom.jpg" alt="Ученик выполняет учебное задание" fill sizes="50vw" />
            </div>
            <div className="split-copy">
              <span className="section-index">/ 03 — Подход</span>
              <h2>Сначала понимаем. Затем <em>создаём.</em></h2>
              <p>
                Изучаем контекст, привлекаем экспертов, запускаем понятный формат и
                улучшаем его на основе обратной связи.
              </p>
              <Link className="button button-dark" href="/contacts">Предложить сотрудничество ↗</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
