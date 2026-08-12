import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = { title: "Контакты", description: "Свяжитесь с общественным фондом Sabat." };

export default function ContactsPage() {
  return <><Header /><main id="main-content">
    <section className="inner-title"><div className="container"><span>Контакты</span><h1>Давайте обсудим,<br />что мы можем сделать вместе</h1></div></section>
    <section className="wide-cover contact-cover"><Image src="/students-classroom.jpg" alt="Связаться с Sabat" fill priority sizes="100vw" unoptimized /></section>
    <section className="contact-section"><div className="sand-title"><h2>Мы открыты к диалогу</h2></div><div className="container contact-grid"><aside><h2>Свяжитесь с нами</h2><div><span>Электронная почта</span><a href="mailto:info@sabat.kz">info@sabat.kz</a></div><div><span>Время ответа</span><p>1–2 рабочих дня</p></div><p className="contact-note">Есть идея, вопрос или предложение о сотрудничестве? Будем рады вашему сообщению.</p></aside><ContactForm /></div></section>
  </main><Footer /></>;
}
