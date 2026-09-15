"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type Language = "ru" | "ky" | "en";

const content = {
  ru: {
    title: "Развиваем человека и специалиста.",
    intro:
      "Помогаем молодым людям развивать характер, осваивать профессию и направлять знания на благо общества. Соединяем личностное развитие с практическими навыками, необходимыми в жизни и работе.",
    philosophyTitle: "Достойный человек — сильный специалист",
    philosophyText:
      "Мы считаем, что профессионализм начинается с человеческих качеств. Поэтому вместе со знаниями и практическими навыками развиваем честность и ответственность — чтобы выпускник хорошо делал своё дело и приносил пользу людям.",
    philosophyImageAlt:
      "Наставник помогает ребёнку осваивать ремесло в мастерской",
    workTitle: "Что мы делаем",
    workText:
      "Готовим студентов к выходу на рынок труда, развиваем педагогов и молодых специалистов, помогаем детям выстраивать здоровые отношения с технологиями. Участники получают практический опыт, работают в командах, развивают лидерство и реализуют собственные проекты.",
    workImageAlt:
      "Специалист работает над архитектурным макетом в мастерской",
    developmentTitle: "Два года последовательного развития",
    developmentText:
      "Двухлетняя программа выстроена как целостный путь: от базовых знаний, самопознания и личного плана развития — к практике, лидерству и самостоятельному проекту. Каждый этап помогает участнику видеть свой прогресс и осознанно выбирать дальнейшее направление.",
    developmentYears: ["Первый год", "Второй год"],
    developmentSteps: [
      ["Базовые знания", "Самопознание", "Личный план"],
      ["Практика", "Лидерство", "Свой проект"],
    ],
    developmentResult: "Осознанный выбор следующего шага",
    communityTitle: "Сообщество «Даанышман»",
    communityText:
      "После завершения программы выпускники остаются частью сообщества «Даанышман». Они поддерживают друг друга, обмениваются опытом и возвращаются в проекты фонда как наставники, эксперты и волонтёры. Так знания и ценности передаются следующему поколению.",
    communityRoles: ["Выпускники", "Наставники", "Эксперты", "Волонтёры"],
    communityCenter: "Даанышман",
    goalTitle: "Цель к 2035 году",
    goalText:
      "К 2035 году мы стремимся создать в Кыргызстане проверенную модель личностной и профессиональной подготовки молодёжи. Сначала развиваем её в Ошской области, затем масштабируем в Жалал-Абадскую и Баткенскую области.",
    goalRegions: ["Ошская область", "Жалал-Абадская", "Баткенская"],
    goalStart: "Точка старта",
    goalScale:
      "Масштабирование",
    goalTarget: "Цель",
    stat: "1 000",
    statLabel: "подготовленных выпускников",
    contact: "Предложить сотрудничество",
  },
  ky: {
    title: "Адамды жана адисти өнүктүрөбүз.",
    intro:
      "Жаштардын мүнөзүн калыптандырууга, кесипти өздөштүрүүгө жана билимин коомдун пайдасына колдонууга жардам беребиз. Жеке өнүгүүнү жашоодо жана эмгекте керектүү практикалык көндүмдөр менен айкалыштырабыз.",
    philosophyTitle: "Мыкты адам — мыкты адис",
    philosophyText:
      "Биз кесипкөйлүк адамдык сапаттардан башталат деп ишенебиз. Ошондуктан билим жана практикалык көндүмдөр менен бирге адалдыкты жана жоопкерчиликти өнүктүрөбүз — бүтүрүүчү ишин мыкты аткарып, адамдарга пайда алып келиши үчүн.",
    philosophyImageAlt:
      "Насаатчы балага устаканада кол өнөрчүлүктү үйрөнүүгө жардам берип жатат",
    workTitle: "Биз эмне кылабыз",
    workText:
      "Студенттерди эмгек рыногуна даярдап, мугалимдерди жана жаш адистерди өнүктүрөбүз, балдарга технология менен туура мамиле түзүүгө жардам беребиз. Катышуучулар практикадан өтүп, командада иштеп, лидерлик сапаттарын өнүктүрүп жана өз долбоорлорун ишке ашырат.",
    workImageAlt:
      "Адис устаканада архитектуралык макеттин үстүндө иштеп жатат",
    developmentTitle: "Эки жылдык ырааттуу өнүгүү",
    developmentText:
      "Эки жылдык программа бирдиктүү жол катары түзүлгөн: негизги билимден, өзүн таануудан жана жеке өнүгүү планынан — практикага, лидерликке жана өз алдынча долбоорго чейин. Ар бир этап катышуучуга өсүшүн көрүп, кийинки багытын аң-сезимдүү тандоого жардам берет.",
    developmentYears: ["Биринчи жыл", "Экинчи жыл"],
    developmentSteps: [
      ["Негизги билим", "Өзүн таануу", "Жеке план"],
      ["Практика", "Лидерлик", "Өз долбоору"],
    ],
    developmentResult: "Кийинки кадамды аң-сезимдүү тандоо",
    communityTitle: "«Даанышман» коомчулугу",
    communityText:
      "Программа аяктагандан кийин бүтүрүүчүлөр «Даанышман» коомчулугунун мүчөсү бойдон калат. Алар бири-бирин колдоп, тажрыйба бөлүшүп, фонддун долбоорлоруна насаатчы, эксперт жана волонтёр катары кайтып келет. Ошентип билим жана баалуулуктар кийинки муунга өтөт.",
    communityRoles: ["Бүтүрүүчүлөр", "Насаатчылар", "Эксперттер", "Волонтёрлор"],
    communityCenter: "Даанышман",
    goalTitle: "2035-жылга чейинки максат",
    goalText:
      "2035-жылга чейин Кыргызстанда жаштарды адамдык жана кесиптик жактан даярдоонун сыналган моделин түзүүнү көздөйбүз. Адегенде аны Ош облусунда өнүктүрүп, андан соң Жалал-Абад жана Баткен облустарына жайылтабыз.",
    goalRegions: ["Ош облусу", "Жалал-Абад", "Баткен"],
    goalStart: "Башталыш чекити",
    goalScale: "Кеңейтүү",
    goalTarget: "Максат",
    stat: "1 000",
    statLabel: "даярдалган бүтүрүүчү",
    contact: "Кызматташууну сунуштоо",
  },
  en: {
    title: "We develop people and professionals.",
    intro:
      "We help young people build character, master a profession and use their knowledge for the benefit of society. We connect personal growth with practical skills for life and work.",
    philosophyTitle: "Strong character. Capable professional.",
    philosophyText:
      "We believe professionalism begins with character. Alongside knowledge and practical skills, we develop integrity and responsibility so graduates can do their work well and create value for others.",
    philosophyImageAlt:
      "A mentor helps a child learn a craft in a workshop",
    workTitle: "What we do",
    workText:
      "We prepare students for the workplace, develop teachers and young professionals, and help children build a healthy relationship with technology. Participants gain practical experience, work in teams, develop leadership and deliver their own projects.",
    workImageAlt:
      "A professional works on an architectural model in a studio",
    developmentTitle: "Two years of structured development",
    developmentText:
      "The two-year programme is designed as one coherent journey: from foundational knowledge, self-awareness and a personal growth plan to practice, leadership and an independent project. Each stage helps participants recognise their progress and choose their next direction with purpose.",
    developmentYears: ["Year one", "Year two"],
    developmentSteps: [
      ["Core knowledge", "Self-awareness", "Personal plan"],
      ["Practice", "Leadership", "Own project"],
    ],
    developmentResult: "A purposeful next step",
    communityTitle: "The Daanishman community",
    communityText:
      "Graduates remain part of the Daanishman community after completing the programme. They support one another, share experience and return to foundation projects as mentors, experts and volunteers, passing knowledge and values to the next generation.",
    communityRoles: ["Graduates", "Mentors", "Experts", "Volunteers"],
    communityCenter: "Daanishman",
    goalTitle: "Our goal for 2035",
    goalText:
      "By 2035, we aim to establish a proven model for the personal and professional development of young people in Kyrgyzstan. We will develop it in the Osh region, then expand it to Jalal-Abad and Batken.",
    goalRegions: ["Osh region", "Jalal-Abad", "Batken"],
    goalStart: "Starting point",
    goalScale: "Scale",
    goalTarget: "Goal",
    stat: "1,000",
    statLabel: "prepared graduates",
    contact: "Propose a partnership",
  },
};

export function AboutContent() {
  const [language, setLanguage] = useState<Language>("ru");
  const page = content[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      "sabat-language",
    ) as Language | null;

    if (
      savedLanguage === "ru" ||
      savedLanguage === "ky" ||
      savedLanguage === "en"
    ) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      setLanguage((event as CustomEvent<Language>).detail);
    };

    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () =>
      window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" className="about-minimal">
        <section className="about-minimal-hero">
          <div className="container">
            <div className="about-minimal-hero-grid">
              <div>
                <h1>{page.title}</h1>
              </div>
              <p>{page.intro}</p>
            </div>
          </div>
        </section>

        <section className="about-minimal-row" id="about-content">
          <div className="container about-minimal-row-grid">
            <div className="about-minimal-copy">
              <h2>{page.philosophyTitle}</h2>
              <p>{page.philosophyText}</p>
            </div>
            <div className="about-minimal-media">
              <Image
                src="/about-character-professional.jpg"
                alt={page.philosophyImageAlt}
                fill
                sizes="(max-width: 850px) 100vw, 55vw"
              />
            </div>
          </div>
        </section>

        <section className="about-minimal-row">
          <div className="container about-minimal-row-grid about-minimal-row-reverse">
            <div className="about-minimal-copy">
              <h2>{page.workTitle}</h2>
              <p>{page.workText}</p>
            </div>
            <div className="about-minimal-media about-minimal-media-work">
              <Image
                src="/about-what-we-do.webp"
                alt={page.workImageAlt}
                fill
                sizes="(max-width: 850px) 100vw, 55vw"
              />
            </div>
          </div>
        </section>

        <div className="about-magazine">
          <div className="container">
            <div className="about-magazine-sheet">
              <section className="about-magazine-section about-magazine-program">
                <h2>{page.developmentTitle}</h2>
                <div className="about-magazine-program-grid">
                  <p>{page.developmentText}</p>
                  {page.developmentYears.map((year, yearIndex) => (
                    <div className="about-magazine-year" key={year}>
                      <strong>{year}</strong>
                      <ul>
                        {page.developmentSteps[yearIndex].map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="about-magazine-section about-magazine-community">
                <div className="about-magazine-community-title">
                  <h2>{page.communityTitle}</h2>
                </div>
                <div className="about-magazine-community-copy">
                  <p>{page.communityText}</p>
                </div>
                <ul className="about-magazine-roles">
                  {page.communityRoles.map((role) => (
                    <li key={role}>
                      <strong>{role}</strong>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="about-magazine-section about-magazine-goal">
                <div className="about-magazine-goal-copy">
                  <h2>{page.goalTitle}</h2>
                  <p>{page.goalText}</p>
                </div>
                <div className="about-magazine-number">
                  <strong>{page.stat}</strong>
                  <span>{page.statLabel}</span>
                </div>
                <ol className="about-magazine-regions">
                  {page.goalRegions.map((region) => (
                    <li key={region}>
                      <strong>{region}</strong>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="about-magazine-cta">
                <p>{page.developmentResult}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
