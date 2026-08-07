import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { newsItems } from "./data/news";

const directions = [
  {
    number: "01",
    title: "Учиться",
    text: "Создаём понятные образовательные форматы, в которых знания становятся практикой.",
    tone: "light",
  },
  {
    number: "02",
    title: "Развиваться",
    text: "Поддерживаем любопытство, самостоятельность и движение к новым возможностям.",
    tone: "green",
  },
  {
    number: "03",
    title: "Делиться",
    text: "Объединяем учеников, педагогов и партнёров в сильное образовательное сообщество.",
    tone: "dark",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="editorial-hero">
          <div className="container">
            <div className="hero-frame">
              <Image
                src="/hero-students.jpg"
                alt="Студенты занимаются вместе в аудитории"
                fill
                sizes="(max-width: 768px) 100vw, 1160px"
                priority
              />
              <div className="hero-shade" />
              <div className="hero-meta">
                <span>Образовательный фонд</span>
                <span>Алматы · Казахстан</span>
              </div>
              <h1 className="display-title">SABAT</h1>
              <div className="hero-editorial-copy">
                <h2>Знания, которые открывают мир</h2>
                <p>
                  Создаём возможности учиться, развиваться и менять пространство
                  вокруг себя.
                </p>
                <Link className="circle-link circle-link-light" href="/about" aria-label="Узнать о фонде">
                  ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="editorial-statement section">
          <div className="container statement-grid">
            <span className="section-index">/ 01 — О фонде</span>
            <div>
              <p className="statement-text">
                Мы верим, что сильное образование строится не вокруг информации,
                а вокруг <em>любопытства</em>, диалога и опыта.
              </p>
              <div className="statement-footer">
                <p>
                  Sabat помогает знаниям становиться опорой для личного развития
                  и позитивных изменений в обществе.
                </p>
                <Link className="underlined-link" href="/about">Больше о нас ↗</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="editorial-heading">
              <span className="section-index">/ 02 — Наш подход</span>
              <h2>Образование как<br /><em>живая система</em></h2>
            </div>

            <div className="bento-layout">
              <div className="bento-photo bento-photo-main">
                <Image
                  src="/students-classroom.jpg"
                  alt="Ученик работает над заданием в классе"
                  fill
                  sizes="(max-width: 800px) 100vw, 55vw"
                />
                <span>Начинаем с интереса</span>
              </div>
              <div className="bento-stack">
                {directions.slice(0, 2).map((direction) => (
                  <article className={`direction-card direction-${direction.tone}`} key={direction.number}>
                    <span>{direction.number}</span>
                    <div>
                      <h3>{direction.title}</h3>
                      <p>{direction.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <article className="wide-direction-card">
              <span>03</span>
              <h3>{directions[2].title}</h3>
              <p>{directions[2].text}</p>
              <Link className="circle-link circle-link-light" href="/contacts" aria-label="Связаться с фондом">→</Link>
            </article>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="process-intro">
              <div>
                <span className="section-index">/ 03 — Как мы работаем</span>
                <h2>От идеи<br />к <em>результату</em></h2>
              </div>
              <p>
                Понимаем потребность, собираем сильную команду, запускаем понятный
                формат и улучшаем его вместе с участниками.
              </p>
            </div>
            <div className="process-visual">
              <div className="process-count">01<span>/04</span></div>
              <div className="process-photo">
                <Image src="/study-group.jpg" alt="Участники учебной группы работают в аудитории" fill sizes="70vw" />
                <div className="photo-caption"><span>Слушаем</span><p>Начинаем с людей и реального контекста.</p></div>
              </div>
              <div className="process-note">Смысл → Формат → Опыт → Развитие</div>
            </div>
          </div>
        </section>

        <section className="section news-editorial-section">
          <div className="container">
            <div className="editorial-heading heading-row">
              <div>
                <span className="section-index">/ 04 — Новости</span>
                <h2>Что происходит<br />в <em>Sabat</em></h2>
              </div>
              <Link className="underlined-link" href="/news">Все новости ↗</Link>
            </div>
            <div className="news-grid">
              {newsItems.slice(0, 3).map((item) => <NewsCard item={item} key={item.slug} />)}
            </div>
          </div>
        </section>

        <section className="container final-visual-cta">
          <Image src="/hero-students.jpg" alt="Образовательное сообщество Sabat" fill sizes="100vw" />
          <div className="hero-shade" />
          <div className="final-cta-copy">
            <span>/ Будем знакомы</span>
            <h2>Создадим новые<br /><em>возможности вместе</em></h2>
            <Link className="button button-light" href="/contacts">Написать нам ↗</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
