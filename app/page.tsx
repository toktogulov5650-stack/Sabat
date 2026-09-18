"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  apiRequest,
  formatNewsDate,
  normalizeFoundationName,
  resolveImageUrl,
  type Language,
  type NewsListItem,
  type NewsPage,
} from "./lib/api";
import { fallbackNews } from "./news/fallback";

const pageContent = {
  ru: {
    hero: (
      <>
        Настоящий профессионал начинается с настоящего человека.
      </>
    ),
    heroDescription:
      "Помогаем молодым людям укреплять характер, осваивать профессию и превращать знания в пользу для общества.",
    contactCta: "Связаться",

    mission: (
      <>
        <strong>Наша миссия</strong> — воспитывать человечных, смелых и
        ответственных молодых людей, которые знают своё дело и готовы служить
        обществу.
      </>
    ),

    vision: (
      <>
        <strong>Цель</strong> — к 2035 году создать в Кыргызстане эталонную
        модель личностной и профессиональной подготовки молодёжи.
      </>
    ),

    news: "Новости",
    newsError: "Не удалось загрузить новости. Попробуйте обновить страницу.",
    newsEmpty: "Пока нет опубликованных новостей.",
    about: "О нас",

    previousNews: "Предыдущая новость",
    nextNews: "Следующая новость",
  },

  ky: {
    hero: (
      <>
        АЛГАЧ — МЫКТЫ АДАМ,
        <br />АНДАН СОҢ — МЫКТЫ АДИС
      </>
    ),
    heroDescription:
      "Жаштардын мүнөзүн бекемдеп, кесиптик чеберчилигин өстүрүп, билимин коомго пайда келтирген күчкө айлантууга жардам беребиз.",
    contactCta: "Байланышуу",

    mission: (
      <>
        <strong>Биздин миссия</strong> — адамгерчиликтүү, тайманбас жана
        жоопкерчиликтүү, өз ишин мыкты билген жана коомго кызмат кылууга даяр
        жаштарды тарбиялоо.
      </>
    ),

    vision: (
      <>
        <strong>Максат</strong> — 2035-жылга чейин Кыргызстанда жаштарды
        адамдык жана кесиптик жактан даярдоонун эталондук моделин түзүү.
      </>
    ),

    news: "Жаңылыктар",
    newsError: "Жаңылыктарды жүктөө мүмкүн болгон жок. Баракты жаңыртып көрүңүз.",
    newsEmpty: "Азырынча жарыяланган жаңылыктар жок.",
    about: "Биз жөнүндө",

    previousNews: "Мурунку жаңылык",
    nextNews: "Кийинки жаңылык",
  },

  en: {
    hero: (
      <>
        A true professional begins with being a good person.
      </>
    ),
    heroDescription:
      "We help young people build character, master their profession and turn knowledge into lasting value for society.",
    contactCta: "Contact us",

    mission: (
      <>
        <strong>Our mission</strong> is to nurture humane, courageous and
        responsible young people who excel in their field and are ready to
        serve society.
      </>
    ),

    vision: (
      <>
        <strong>Goal</strong> — by 2035, establish Kyrgyzstan’s benchmark model
        for the personal and professional development of young people.
      </>
    ),

    news: "News",
    newsError: "We couldn’t load the news. Please refresh the page.",
    newsEmpty: "There are no published stories yet.",
    about: "About us",

    previousNews: "Previous news",
    nextNews: "Next news",
  },
};

const values = {
  ru: [
    {
      title: "Кто мы",
      text:
        "Общественный фонд \"Сабат\". Через социальные и образовательные проекты мы помогаем молодым людям развивать человеческие качества, осваивать профессию и применять знания на благо общества. Для нас образование — это не только диплом: оно должно формировать мышление, ответственность и понимание своего долга перед людьми.",
    },
    {
      title: "Наш подход",
      text:
        "Наша модель объединяет два направления: развитие личности и профессиональную подготовку. Сначала молодой человек укрепляет характер — человечность, патриотизм, ответственность и смелость. Затем получает глубокие знания, практические навыки и культуру труда.",
    },
    {
      title: "Общественный результат",
      text:
        "Мы стремимся подготовить поколение, которое умеет самостоятельно мыслить, добросовестно работать и приносить пользу людям. Так возникает устойчивая связь: образованный молодой человек становится сильным специалистом, ответственным гражданином и участником развития общества.",
    },
  ],

  ky: [
    {
      title: "Биз кимбиз",
      text:
        "\"Сабат\" коомдук фонду. Социалдык жана билим берүү долбоорлору аркылуу жаштардын адамдык сапаттарын өнүктүрүп, кесипти өздөштүрүүгө жана билимин коомдун пайдасына колдонууга жардам беребиз. Биз үчүн билим — диплом гана эмес: ал туура ой жүгүртүүнү, жоопкерчиликти жана эл алдындагы милдетти калыптандырышы керек.",
    },
    {
      title: "Биздин ыкма",
      text:
        "Биздин моделибиз эки багытты бириктирет: адамдык өнүгүү жана кесиптик даярдык. Адегенде жаш адамгерчилик, мекенчилдик, жоопкерчилик жана тайманбастык сапаттарын бекемдейт. Андан кийин терең билимди, практикалык көндүмдү жана эмгек маданиятын өздөштүрөт.",
    },
    {
      title: "Коомдук натыйжа",
      text:
        "Биз өз алдынча ой жүгүрткөн, ишин адал аткарган жана адамдарга пайда келтирген муунду даярдоого умтулабыз. Натыйжада билимдүү жаш мыкты адиске, иш менен камсыз болгон жоопкерчиликтүү жаранга жана коомдун өнүгүшүнө салым кошкон инсанга айланат.",
    },
  ],

  en: [
    {
      title: "Who we are",
      text:
        "Sabat Public Foundation. Through social and educational projects, we help young people develop character, master a profession and apply knowledge for the benefit of society. For us, education is more than a diploma: it should shape clear thinking, responsibility and a sense of duty to others.",
    },
    {
      title: "Our approach",
      text:
        "Our model brings together two areas: personal development and professional preparation. Young people first strengthen humanity, patriotism, responsibility and courage. They then develop deep knowledge, practical skills and a strong work ethic.",
    },
    {
      title: "Social impact",
      text:
        "We aim to prepare a generation that thinks independently, works with integrity and creates value for others. In this way, an educated young person becomes a capable professional, a responsible citizen and an active contributor to society’s development.",
    },
  ],
};

const valueImages = [
  {
    src: "/about-who-we-are.jpg",
    alt: {
      ru: "Книги и рабочая тетрадь на столе",
      ky: "Стол үстүндөгү китептер жана жумушчу дептер",
      en: "Books and a notebook on a study table",
    },
  },
  {
    src: "/about-our-approach-collaboration-v2.webp",
    alt: {
      ru: "Молодые люди вместе работают над учебным заданием",
      ky: "Жаштар окуу тапшырмасынын үстүндө чогуу иштеп жатышат",
      en: "Young people working together on a study assignment",
    },
  },
  {
    src: "/about-social-impact-community.webp",
    alt: {
      ru: "Молодые люди вместе создают план общественного проекта",
      ky: "Жаштар коомдук долбоордун планын чогуу түзүп жатышат",
      en: "Young people creating a community project plan together",
    },
  },
] as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [news, setNews] = useState<NewsListItem[]>(
    fallbackNews.ru.items.slice(0, 3),
  );
  const [newsError, setNewsError] = useState(false);
  const [newsOffset, setNewsOffset] = useState(0);
  const [newsDirection, setNewsDirection] = useState<"previous" | "next" | null>(null);

  const content = pageContent[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      "sabat-language"
    ) as Language | null;

    if (
      savedLanguage === "ru" ||
      savedLanguage === "ky" ||
      savedLanguage === "en"
    ) {
      setLanguage(savedLanguage);
    }

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;

      setLanguage(customEvent.detail);
    }

    window.addEventListener(
      "sabat-language-change",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "sabat-language-change",
        handleLanguageChange
      );
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadNews() {
      setNews(fallbackNews[language].items.slice(0, 3));
      setNewsError(false);
      setNewsOffset(0);
      setNewsDirection(null);

      try {
        const result = await apiRequest<NewsPage>(
          `/api/news/latest?lang=${language}&take=3`,
          { signal: controller.signal },
        );
        setNews(result.items);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        // Keep the built-in snapshot visible during a cold start or a
        // temporary API outage. The next visit refreshes it again.
        setNews(fallbackNews[language].items.slice(0, 3));
      }
    }

    void loadNews();
    return () => controller.abort();
  }, [language]);

  const displayedNews = news.map(
    (_, index) => news[(index + newsOffset) % news.length],
  );

  function moveNews(direction: "previous" | "next") {
    setNewsDirection(direction);
    setNewsOffset((value) =>
      direction === "previous"
        ? (value - 1 + news.length) % news.length
        : (value + 1) % news.length,
    );
  }

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/sabat-hero-sky.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <Header />

      <main id="main-content">

        {/* ===================================
            ГЛАВНЫЙ ЭКРАН
        =================================== */}

        <section className="main-hero">
          <div className="container">
            <div className="main-hero-card">

              <div className="main-hero-content">
                <h1>
                  {content.hero}
                </h1>

                <p>
                  {content.heroDescription}
                </p>

                <Link className="main-hero-action" href="/contacts">
                  {content.contactCta}
                </Link>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================
            МИССИЯ — НЕ МЕНЯЕМ
        =================================== */}

        <section className="mission-section">
          <div className="container mission-grid">

            <article className="mission-left">
              <h2>
                {content.mission}
              </h2>
            </article>

            <article>
              <h2>
                {content.vision}
              </h2>
            </article>

          </div>
        </section>


        {/* ===================================
            НОВОСТИ — НЕ МЕНЯЕМ
        =================================== */}

        <section className="news-section">

          <div className="container news-heading">
            <h2>
              {content.news}
            </h2>
          </div>

          {newsError ? (
            <p className="container news-status news-status-error" role="alert">{content.newsError}</p>
          ) : news.length === 0 ? (
            <p className="container news-status">{content.newsEmpty}</p>
          ) : (
            <div
              className={`container news-grid news-carousel-grid${newsDirection ? ` is-${newsDirection}` : ""}`}
              key={newsOffset}
            >
            {displayedNews.map((item, index) => {
              const imageUrl = resolveImageUrl(item.coverImageUrl);

              return (
              <Link
                className={`news-card ${
                  index === 0 ? "featured" : "compact"
                }`}
                href={`/news/${item.slug}`}
                id={`news-card-${index + 1}`}
                key={item.slug}
              >
                <div className="news-image-placeholder" aria-hidden={!imageUrl}>
                  {imageUrl ? <img src={imageUrl} alt="" loading="lazy" decoding="async" /> : null}
                </div>

                <h3>
                  {normalizeFoundationName(item.title, language)}
                </h3>

                <time dateTime={item.publishedAt}>
                  {formatNewsDate(item.publishedAt, language)}
                </time>

              </Link>
            )})}
            </div>
          )}

          {!newsError && news.length > 1 ? <div className="news-controls">

            <a
              href="#news-card-2"
              aria-label={content.previousNews}
              onClick={(event) => {
                event.preventDefault();
                moveNews("previous");
              }}
            >
              ‹
            </a>

            <a
              href="#news-card-3"
              aria-label={content.nextNews}
              onClick={(event) => {
                event.preventDefault();
                moveNews("next");
              }}
            >
              ›
            </a>

          </div> : null}

        </section>


        {/* ===================================
            О НАС — НЕ МЕНЯЕМ
        =================================== */}

        <section className="values-section">

          <div className="container">
            <h2 className="section-title">
              {content.about}
            </h2>
          </div>

          <div className="container values-list">

            {values[language].map((value, index) => (
              <article
                className={`value-row ${
                  index % 2 ? "" : "reverse"
                }`}
                key={value.title}
              >

                <div className="value-image">
                  <Image
                    src={valueImages[index].src}
                    alt={valueImages[index].alt[language]}
                    fill
                    loading="eager"
                    sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1200px) 50vw, 570px"
                  />
                </div>

                <div className="value-copy">

                  <h3>
                    {value.title}
                  </h3>

                  <p>
                    {value.text}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
