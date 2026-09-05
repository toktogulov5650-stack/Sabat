"use client";

import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { newsItems } from "./data/news";

type Language = "ru" | "kk";

const pageContent = {
  ru: {
    quote: "«Перемены начинаются там, где люди слышат друг друга и действуют вместе»",
    foundation: "Фонд Sabat",
    hero: <>Объединяем людей<br />вокруг важных дел</>,
    mission: <><strong>Наша миссия</strong> — поддерживать людей и инициативы, которые приносят пользу обществу.</>,
    vision: <><strong>Наше видение</strong> — открытое сообщество, в котором каждый может внести свой вклад.</>,
    news: "Новости",
    about: "О нас",
    previousNews: "Предыдущая новость",
    nextNews: "Следующая новость",
  },
  kk: {
    quote: "«Өзгерістер адамдар бір-бірін тыңдап, бірге әрекет еткен жерде басталады»",
    foundation: "Sabat қоры",
    hero: <>Маңызды істердің айналасына<br />адамдарды біріктіреміз</>,
    mission: <><strong>Біздің миссиямыз</strong> — қоғамға пайда әкелетін адамдар мен бастамаларды қолдау.</>,
    vision: <><strong>Біздің көзқарасымыз</strong> — әр адам өз үлесін қоса алатын ашық қауымдастық.</>,
    news: "Жаңалықтар",
    about: "Біз туралы",
    previousNews: "Алдыңғы жаңалық",
    nextNews: "Келесі жаңалық",
  },
};

const values = {
  ru: [
  { title: "Открытость", text: "Мы создаём пространство, где разные взгляды могут встречаться с уважением и вниманием. Для нас важно слушать друг друга, говорить честно и вместе находить решения, которые делают сообщество сильнее." },
  { title: "Сообщество", text: "Сильные изменения начинаются с доверия, сотрудничества и готовности действовать вместе. Мы соединяем людей с разным опытом, потому что общие дела помогают поддерживать друг друга и создавать устойчивые перемены." },
  { title: "Действие", text: "Для нас важна не только идея, но и её реальная польза для людей и общества. Мы помогаем инициативам пройти путь от первого разговора до конкретного результата, который заметен в жизни сообщества." },
  ],
  kk: [
    { title: "Ашықтық", text: "Біз әртүрлі көзқарастар құрмет пен түсіністікпен тоғысатын орта қалыптастырамыз. Бір-бірімізді тыңдап, ашық сөйлесіп және қауымдастықты күшейтетін шешімдерді бірге табу біз үшін маңызды." },
    { title: "Қауымдастық", text: "Тұрақты өзгерістер сенімнен, ынтымақтастықтан және бірге әрекет етуге дайындықтан басталады. Ортақ істер адамдардың бір-біріне қолдау көрсетіп, ұзақ мерзімді өзгерістер жасауына көмектеседі." },
    { title: "Әрекет", text: "Біз үшін идеяның өзі ғана емес, адамдар мен қоғамға беретін нақты пайдасы да маңызды. Бастамаларға алғашқы әңгімеден бастап қауымдастық өмірінде байқалатын нәтижеге дейінгі жолдан өтуге көмектесеміз." },
  ],
};

const newsTitles = {
  ru: newsItems.map((item) => item.title),
  kk: ["Sabat қоғамдық жобаларының жаңа маусымы", "Sabat қауымдастығының ашық кездесуі", "Неліктен үлкен өзгерістер кішіден басталады"],
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const content = pageContent[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;
    if (savedLanguage === "ru" || savedLanguage === "kk") setLanguage(savedLanguage);
    const handleLanguageChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () => window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  return <><Header /><main id="main-content">
    <section className="quote-hero"><div className="container"><p>{content.quote}</p></div></section>
    <section className="hero-placeholder"><div className="container hero-caption"><span>{content.foundation}</span><h1>{content.hero}</h1></div></section>

    <section className="mission-section"><div className="container mission-grid">
      <article><h2>{content.mission}</h2></article>
      <article><h2>{content.vision}</h2></article>
    </div></section>

    <section className="news-section">
      <div className="container news-heading"><h2>{content.news}</h2></div>
      <div className="container news-grid">
      {newsItems.slice(0,3).map((item,index)=><article className={`news-card ${index === 0 ? "featured" : "compact"}`} id={`news-card-${index+1}`} key={item.slug}><div className="news-image-placeholder" aria-hidden="true" /><h3>{newsTitles[language][index]}</h3><time>{item.date}</time></article>)}
      </div>
      <div className="news-controls"><a href="#news-card-2" aria-label={content.previousNews}>‹</a><a href="#news-card-3" aria-label={content.nextNews}>›</a></div>
    </section>

    <section className="values-section"><div className="container"><h2 className="section-title">{content.about}</h2></div><div className="container values-list">
      {values[language].map((value,index)=><article className={`value-row ${index%2 ? "" : "reverse"}`} key={value.title}><div className="value-image-placeholder" aria-hidden="true" /><div className="value-copy"><h3>{value.title}</h3><p>{value.text}</p></div></article>)}
    </div></section>

  </main><Footer /></>;
}
