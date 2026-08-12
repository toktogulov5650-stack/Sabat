"use client";

import { FormEvent } from "react";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Сообщение с сайта Sabat — ${name}`);
    const body = encodeURIComponent(`Имя: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@sabat.kz?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Ваше имя
          <input name="name" type="text" placeholder="Как к вам обращаться" required />
        </label>
        <label>
          Электронная почта
          <input name="email" type="email" placeholder="name@example.com" required />
        </label>
      </div>
      <label>
        Сообщение
        <textarea name="message" rows={6} placeholder="Расскажите, чем мы можем помочь" required />
      </label>
      <button className="form-submit" type="submit">
        Отправить сообщение <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">Нажатие откроет ваше почтовое приложение.</p>
    </form>
  );
}
