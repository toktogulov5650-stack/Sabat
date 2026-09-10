"use client";

import { FormEvent } from "react";

export type ContactFormCopy = {
  title: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  mailSubject: string;
};

export function ContactForm({ copy }: { copy: ContactFormCopy }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`${copy.mailSubject} — ${name}`);
    const body = encodeURIComponent(`${copy.name}: ${name}\n${copy.email}: ${email}\n\n${message}`);
    window.location.href = `mailto:info@sabat.kz?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-heading">
        <h2>{copy.title}</h2>
      </div>
      <div className="form-row">
        <label>
          {copy.name}
          <input name="name" type="text" placeholder={copy.namePlaceholder} autoComplete="name" required />
        </label>
        <label>
          {copy.email}
          <input name="email" type="email" placeholder={copy.emailPlaceholder} autoComplete="email" required />
        </label>
      </div>
      <label>
        {copy.message}
        <textarea name="message" rows={5} placeholder={copy.messagePlaceholder} required />
      </label>
      <button className="form-submit" type="submit">
        {copy.submit} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
