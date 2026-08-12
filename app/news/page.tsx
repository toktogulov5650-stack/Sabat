import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { newsItems } from "../data/news";

export const metadata: Metadata = { title: "Новости", description: "Новости, события и истории фонда Sabat." };

export default function NewsPage() {
  return <><Header /><main id="main-content">
    <section className="inner-title"><div className="container"><span>Новости фонда</span><h1>События, истории<br />и полезные идеи</h1></div></section>
    <section className="wide-cover news-cover"><Image src="/hero-students.jpg" alt="Новости Sabat" fill priority sizes="100vw" unoptimized /></section>
    <section className="news-archive"><div className="sand-title"><h2>Последние публикации</h2></div><div className="container archive-grid">
      {newsItems.map(item=><article className="archive-card" id={item.slug} key={item.slug}><div className="archive-image"><Image src={item.image} alt={item.imageAlt} fill sizes="50vw" unoptimized /></div><div className="archive-copy"><span>{item.category}</span><h2>{item.title}</h2><time>{item.date}</time><p>{item.excerpt}</p><details><summary>Читать полностью</summary><p>{item.body}</p></details></div></article>)}
    </div></section>
  </main><Footer /></>;
}
