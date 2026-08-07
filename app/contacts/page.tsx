import type { Metadata } from "next";
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
        <section className="page-hero section contact-hero">
          <div className="container narrow-hero">
            <span className="eyebrow">Контакты</span>
            <h1>Будем рады вашему сообщению</h1>
            <p>Есть идея, вопрос или предложение о сотрудничестве? Напишите нам.</p>
          </div>
        </section>

        <section className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-details">
              <span className="eyebrow">Как с нами связаться</span>
              <div className="contact-item">
                <span>Электронная почта</span>
                <a href="mailto:info@sabat.kz">info@sabat.kz</a>
              </div>
              <div className="contact-item">
                <span>Местоположение</span>
                <p>Алматы, Казахстан</p>
              </div>
              <div className="contact-item">
                <span>Время ответа</span>
                <p>Обычно в течение 1–2 рабочих дней</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
