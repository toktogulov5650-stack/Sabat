import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с образовательным фондом Sabat.",
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="contact-editorial-hero section">
          <div className="container">
            <span className="section-index">/ Открыты к диалогу</span>
            <h1>ДАВАЙТЕ<br /><em>ПОГОВОРИМ</em></h1>
            <div className="contact-intro-grid">
              <p>Есть идея, вопрос или предложение о сотрудничестве? Будем рады вашему сообщению.</p>
              <div className="contact-mini-photo">
                <Image src="/hero-students.jpg" alt="Образовательное сообщество" fill sizes="320px" />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-soft contact-section">
          <div className="container contact-grid">
            <div className="contact-details">
              <span className="section-index">/ Контакты</span>
              <div className="contact-item"><span>Электронная почта</span><a href="mailto:info@sabat.kz">info@sabat.kz</a></div>
              <div className="contact-item"><span>Местоположение</span><p>Алматы, Казахстан</p></div>
              <div className="contact-item"><span>Время ответа</span><p>1–2 рабочих дня</p></div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
