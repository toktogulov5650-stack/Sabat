"use client";

import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { newsItems } from "./data/news";

type Language = "ru" | "ky" | "en";

const pageContent = {
  ru: {
    foundation: "Общественный образовательный фонд «Сабат»",
    hero: (
      <>
        Сначала — достойный человек.
        <br />
        Затем — сильный специалист.
      </>
    ),
    heroDescription:
      "Помогаем молодым людям укреплять характер, осваивать профессию и превращать знания в пользу для общества.",
    photoPlaceholder: "Место для фото",

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
    about: "О нас",

    previousNews: "Предыдущая новость",
    nextNews: "Следующая новость",
  },

  ky: {
    foundation: "«Сабат» билим берүүчү коомдук фонду",
    hero: (
      <>
        Биринчи — мыкты адам.
        <br />Андан кийин — мыкты адис.
      </>
    ),
    heroDescription:
      "Жаштардын мүнөзүн бекемдеп, кесиптик чеберчилигин өстүрүп, билимин коомго пайда келтирген күчкө айлантууга жардам беребиз.",
    photoPlaceholder: "Сүрөт үчүн орун",

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
    about: "Биз жөнүндө",

    previousNews: "Мурунку жаңылык",
    nextNews: "Кийинки жаңылык",
  },

  en: {
    foundation: "Sabat Public Education Foundation",
    hero: (
      <>
        First, a person of character.
        <br />Then, a capable professional.
      </>
    ),
    heroDescription:
      "We help young people build character, master their profession and turn knowledge into lasting value for society.",
    photoPlaceholder: "Photo placeholder",

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
        "«Сабат» — общественный образовательный фонд. Через социальные и образовательные проекты мы помогаем молодым людям развивать человеческие качества, осваивать профессию и применять знания на благо общества. Для нас образование — это не только диплом: оно должно формировать мышление, ответственность и понимание своего долга перед людьми.",
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
        "«Сабат» — билим берүүчү коомдук фонд. Социалдык жана билим берүү долбоорлору аркылуу жаштардын адамдык сапаттарын өнүктүрүп, кесипти өздөштүрүүгө жана билимин коомдун пайдасына колдонууга жардам беребиз. Биз үчүн билим — диплом гана эмес: ал туура ой жүгүртүүнү, жоопкерчиликти жана эл алдындагы милдетти калыптандырышы керек.",
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
        "Sabat is a public education foundation. Through social and educational projects, we help young people develop character, master a profession and apply knowledge for the benefit of society. For us, education is more than a diploma: it should shape clear thinking, responsibility and a sense of duty to others.",
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

const newsTitles = {
  ru: newsItems.map((item) => item.title),

  ky: [
    "Sabat долбоорлорунун жаңы сезону",
    "Sabat коомчулугунун ачык жолугушуусу",
    "Эмне үчүн чоң өзгөрүүлөр кичине кадамдардан башталат",
  ],

  en: [
    "A new season of Sabat projects",
    "Open meeting of the Sabat community",
    "Why big changes begin with small steps",
  ],
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");

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

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ===================================
            ГЛАВНЫЙ ЭКРАН
        =================================== */}

        <section className="main-hero">
          <div className="container">
            <div className="main-hero-card">

              <div className="main-hero-content">
                <span className="main-hero-label">
                  {content.foundation}
                </span>

                <h1>
                  {content.hero}
                </h1>

                <p>
                  {content.heroDescription}
                </p>
              </div>

              <div
                className="main-hero-photo"
                aria-hidden="true"
              >
                <span>
                  {content.photoPlaceholder}
                </span>
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

          <div className="container news-grid">

            {newsItems.slice(0, 3).map((item, index) => (
              <article
                className={`news-card ${
                  index === 0 ? "featured" : "compact"
                }`}
                id={`news-card-${index + 1}`}
                key={item.slug}
              >
                <div
                  className="news-image-placeholder"
                  aria-hidden="true"
                />

                <h3>
                  {newsTitles[language][index]}
                </h3>

                <time>
                  {item.date}
                </time>

              </article>
            ))}

          </div>

          <div className="news-controls">

            <a
              href="#news-card-2"
              aria-label={content.previousNews}
            >
              ‹
            </a>

            <a
              href="#news-card-3"
              aria-label={content.nextNews}
            >
              ›
            </a>

          </div>

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

                <div
                  className="value-image-placeholder"
                  aria-hidden="true"
                />

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
