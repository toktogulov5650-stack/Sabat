import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { newsItems } from "./data/news";

const directions = [
  {
    number: "01",
    title: "Общественные инициативы",
    text: "Поддерживаем проекты, которые объединяют людей и приносят пользу сообществу.",
    image: "/hero-students.jpg",
    alt: "Участники сообщества работают вместе",
  },
  {
    number: "02",
    title: "Культура и ценности",
    text: "Создаём пространство для диалога, взаимного уважения и сохранения важных ценностей.",
    image: "/students-classroom.jpg",
    alt: "Участники культурной и общественной программы",
  },
  {
    number: "03",
    title: "Знания и развитие",
    text: "Помогаем людям получать полезные знания, развивать способности и открывать новые возможности.",
    image: "/study-group.jpg",
    alt: "Люди участвуют в программе развития",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="home-page">
        <section className="home-hero">
          <div className="container">
            <div className="home-hero-media">
              <Image
                src="/hero-students.jpg"
                alt="Люди вместе работают над общей инициативой"
                fill
                sizes="(max-width: 768px) 100vw, 1240px"
                priority
                unoptimized
              />
              <div className="home-hero-overlay" />
              <div className="home-hero-content">
                <span className="home-kicker">Фонд Sabat</span>
                <h1>Объединяем людей вокруг важных ценностей</h1>
                <p>
                  Создаём полезные инициативы, поддерживаем развитие и укрепляем
                  связи между людьми.
                </p>
                <div className="home-actions">
                  <Link className="home-button home-button-light" href="/about">
                    Узнать больше <span aria-hidden="true">↗</span>
                  </Link>
                  <Link className="home-text-link home-text-link-light" href="/contacts">
                    Связаться с нами
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-news-section">
          <div className="container">
            <div className="home-section-heading">
              <div>
                <span className="home-kicker">Новости фонда</span>
                <h2>Последние новости</h2>
              </div>
              <Link className="home-text-link" href="/news">
                Все новости <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="news-grid">
              {newsItems.slice(0, 3).map((item) => (
                <NewsCard item={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-purpose-section">
          <div className="container">
            <div className="home-purpose-intro">
              <span className="home-kicker">О фонде</span>
              <h2>Sabat создаёт среду для сотрудничества, развития и добрых перемен.</h2>
            </div>
            <div className="home-purpose-grid">
              <article>
                <span>Наша миссия</span>
                <h3>Объединять людей и поддерживать инициативы, важные для общества.</h3>
              </article>
              <article>
                <span>Наше видение</span>
                <h3>Открытое и сильное сообщество, в котором каждый может внести свой вклад.</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="home-section home-directions-section">
          <div className="container">
            <div className="home-section-heading">
              <div>
                <span className="home-kicker">Что мы делаем</span>
                <h2>Направления фонда</h2>
              </div>
            </div>
            <div className="home-directions-list">
              {directions.map((direction, index) => (
                <article className={`home-direction ${index % 2 ? "home-direction-reverse" : ""}`} key={direction.number}>
                  <div className="home-direction-image">
                    <Image src={direction.image} alt={direction.alt} fill sizes="(max-width: 760px) 100vw, 55vw" unoptimized />
                  </div>
                  <div className="home-direction-copy">
                    <span>{direction.number}</span>
                    <h3>{direction.title}</h3>
                    <p>{direction.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-contact-section">
          <div className="container home-contact-panel">
            <div>
              <span className="home-kicker home-kicker-light">Открыты к сотрудничеству</span>
              <h2>Есть идея или предложение?</h2>
              <p>Напишите нам — обсудим, что мы можем сделать вместе.</p>
            </div>
            <Link className="home-button home-button-light" href="/contacts">
              Связаться <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
