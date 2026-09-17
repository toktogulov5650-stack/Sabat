"use client";

import { useEffect, useState } from "react";
import { ContactForm, type ContactFormCopy } from "../components/ContactForm";

type Language = "ru" | "ky" | "en";

type ContactsCopy = {
  title: string;
  intro: string;
  panelEyebrow: string;
  panelTitle: string;
  form: ContactFormCopy;
};

const copy: Record<Language, ContactsCopy> = {
  ru: {
    title: "Хорошие идеи начинаются с диалога.",
    intro: "Расскажите об инициативе, предложите сотрудничество или задайте вопрос. Мы внимательно читаем каждое сообщение и будем рады вместе обсудить следующие шаги.",
    panelEyebrow: 'Общественный фонд "Сабат"',
    panelTitle: "Мы открыты к диалогу.",
    form: {
      title: "Расскажите о вашей идее",
      name: "Ваше имя",
      namePlaceholder: "Как к вам обращаться",
      email: "Электронная почта",
      emailPlaceholder: "name@example.com",
      message: "Сообщение",
      messagePlaceholder: "Опишите идею, вопрос или предложение",
      submit: "Отправить сообщение",
      submitting: "Отправляем…",
      success: "Спасибо! Ваше сообщение отправлено.",
      validationError: "Проверьте заполненные поля.",
      rateLimitError: "Слишком много попыток. Попробуйте немного позже.",
      serverError: "Не удалось отправить сообщение. Попробуйте ещё раз.",
    },
  },
  ky: {
    title: "Жакшы идеялар диалогдон башталат.",
    intro: "Демилгеңиз тууралуу айтып, кызматташууну сунуштаңыз же суроо бериңиз. Биз ар бир билдирүүнү кунт коюп окуп, кийинки кадамдарды чогуу талкуулоого даярбыз.",
    panelEyebrow: '"Сабат" коомдук фонду',
    panelTitle: "Биз баарлашууга ачыкпыз.",
    form: {
      title: "Идеяңыз тууралуу айтып бериңиз",
      name: "Атыңыз",
      namePlaceholder: "Сизге кантип кайрылалы",
      email: "Электрондук почта",
      emailPlaceholder: "name@example.com",
      message: "Билдирүү",
      messagePlaceholder: "Идеяңызды, сурооңузду же сунушуңузду жазыңыз",
      submit: "Билдирүү жөнөтүү",
      submitting: "Жөнөтүлүүдө…",
      success: "Рахмат! Билдирүүңүз жөнөтүлдү.",
      validationError: "Толтурулган талааларды текшериңиз.",
      rateLimitError: "Өтө көп аракет болду. Бир аздан кийин кайталап көрүңүз.",
      serverError: "Билдирүүнү жөнөтүү мүмкүн болгон жок. Кайра аракет кылыңыз.",
    },
  },
  en: {
    title: "Good ideas begin with dialogue.",
    intro: "Tell us about your initiative, propose a partnership or ask a question. We read every message carefully and would be glad to discuss the next steps together.",
    panelEyebrow: "Sabat Public Foundation",
    panelTitle: "We are open to dialogue.",
    form: {
      title: "Tell us about your idea",
      name: "Your name",
      namePlaceholder: "How should we address you?",
      email: "Email",
      emailPlaceholder: "name@example.com",
      message: "Message",
      messagePlaceholder: "Describe your idea, question or proposal",
      submit: "Send message",
      submitting: "Sending…",
      success: "Thank you! Your message has been sent.",
      validationError: "Please check the fields you completed.",
      rateLimitError: "Too many attempts. Please try again a little later.",
      serverError: "We couldn’t send your message. Please try again.",
    },
  },
};

export function ContactsContent() {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;
    if (savedLanguage === "ru" || savedLanguage === "ky" || savedLanguage === "en") setLanguage(savedLanguage);

    const handleLanguageChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () => window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  const content = copy[language];

  return (
    <main id="main-content" className="contact-page">
      <section className="contact-editorial-hero">
        <div className="container contact-hero-grid">
          <div>
            <h1>{content.title}</h1>
          </div>
          <div className="contact-hero-intro">
            <p>{content.intro}</p>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact-form">
        <div className="container">
          <div className="contact-shell">
            <aside className="contact-brief">
              <span className="contact-brief-eyebrow">{content.panelEyebrow}</span>
              <h2>{content.panelTitle}</h2>
            </aside>
            <ContactForm copy={content.form} language={language} />
          </div>
        </div>
      </section>
    </main>
  );
}
