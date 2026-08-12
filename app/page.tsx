import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { newsItems } from "./data/news";

const values = [
  { title: "Открытость", text: "Мы создаём пространство, где разные взгляды могут встречаться с уважением и вниманием.", image: "/study-group.jpg", alt: "Участники обсуждают общую идею" },
  { title: "Сообщество", text: "Сильные изменения начинаются с доверия, сотрудничества и готовности действовать вместе.", image: "/hero-students.jpg", alt: "Люди работают вместе" },
  { title: "Действие", text: "Для нас важна не только идея, но и её реальная польза для людей и общества.", image: "/students-classroom.jpg", alt: "Участники проекта за работой" },
];

export default function Home() {
  return <><Header /><main id="main-content">
    <section className="quote-hero"><div className="container"><p>«Перемены начинаются там, где люди слышат друг друга и действуют вместе»</p></div></section>
    <section className="hero-photo"><Image src="/hero-students.jpg" alt="Сообщество фонда Sabat" fill priority sizes="100vw" unoptimized /><div className="hero-caption"><span>Фонд Sabat</span><h1>Объединяем людей<br />вокруг важных дел</h1></div></section>

    <section className="mission-section"><div className="container mission-grid">
      <article><h2><strong>Наша миссия</strong> — поддерживать людей и инициативы, которые приносят пользу обществу.</h2></article>
      <article><h2><strong>Наше видение</strong> — открытое сообщество, в котором каждый может внести свой вклад.</h2></article>
    </div></section>

    <section className="news-section"><div className="sand-title"><h2>Фонд Sabat — пространство, где идеи и совместные действия объединяют людей</h2></div><div className="container news-grid">
      {newsItems.slice(0,3).map(item=><article className="news-card" key={item.slug}><div className="news-image"><Image src={item.image} alt={item.imageAlt} fill sizes="33vw" unoptimized /></div><span>{item.category}</span><h3>{item.title}</h3><time>{item.date}</time><Link href={`/news#${item.slug}`}>Подробнее</Link></article>)}
    </div><div className="center-link"><Link href="/news">Все новости →</Link></div></section>

    <section className="values-section"><div className="sand-title"><h2>Наши ценности</h2></div><div className="container values-list">
      {values.map((value,index)=><article className={`value-row ${index%2 ? "reverse" : ""}`} key={value.title}><div className="value-image"><Image src={value.image} alt={value.alt} fill sizes="50vw" unoptimized /></div><div className="value-copy"><h3>{value.title}</h3><p>{value.text}</p></div></article>)}
    </div></section>

    <section className="join-band"><div className="container"><h2>Здесь мы объединяем людей!</h2><Link href="/contacts">Связаться с нами</Link></div></section>
  </main><Footer /></>;
}
