import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "О фонде", description: "Миссия, ценности и история общественного фонда Sabat." };

export default function AboutPage() {
  return <><Header /><main id="main-content">
    <section className="inner-title"><div className="container"><span>О фонде</span><h1>Люди, идеи<br />и добрые перемены</h1></div></section>
    <div className="wide-image-placeholder" aria-hidden="true" />
    <section className="mission-section"><div className="container mission-grid"><article><h2><strong>Мы объединяем</strong> людей, которым важно делать жизнь вокруг лучше.</h2></article><article><h2><strong>Мы поддерживаем</strong> инициативы от первого разговора до реального результата.</h2></article></div></section>
    <section><div className="sand-title"><h2>Что для нас важно</h2></div><div className="container values-list">
      <article className="value-row"><div className="value-image-placeholder" aria-hidden="true" /><div className="value-copy"><h3>Открытость</h3><p>Слушаем разные мнения, говорим честно и создаём безопасное пространство для диалога.</p></div></article>
      <article className="value-row reverse"><div className="value-image-placeholder" aria-hidden="true" /><div className="value-copy"><h3>Ответственность</h3><p>Бережно относимся к доверию людей, ресурсам и результатам каждого проекта.</p></div></article>
      <article className="value-row"><div className="value-image-placeholder" aria-hidden="true" /><div className="value-copy"><h3>Сотрудничество</h3><p>Соединяем опыт и усилия, потому что устойчивые изменения рождаются вместе.</p><Link className="text-button" href="/contacts">Предложить сотрудничество →</Link></div></article>
    </div></section>
  </main><Footer /></>;
}
