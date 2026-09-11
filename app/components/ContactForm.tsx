"use client";

import { FormEvent, useState } from "react";
import { ApiError, apiRequest, type Language } from "../lib/api";

export type ContactFormCopy = {
  title: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  validationError: string;
  rateLimitError: string;
  serverError: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ copy, language }: { copy: ContactFormCopy; language: Language }) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const form = new FormData(target);

    setStatus("submitting");
    setStatusMessage("");

    try {
      await apiRequest<{ id: string; message: string }>("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          message: String(form.get("message") ?? "").trim(),
          language,
          website: String(form.get("website") ?? ""),
        }),
      });
      target.reset();
      setStatus("success");
      setStatusMessage(copy.success);
    } catch (error) {
      setStatus("error");

      if (error instanceof ApiError && error.status === 400) {
        setStatusMessage(copy.validationError);
      } else if (error instanceof ApiError && error.status === 429) {
        setStatusMessage(copy.rateLimitError);
      } else {
        setStatusMessage(copy.serverError);
      }
    }
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
      <label className="contact-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="form-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? copy.submitting : copy.submit}
        <span aria-hidden="true">→</span>
      </button>
      {statusMessage ? (
        <p
          className={`contact-form-status ${status === "success" ? "is-success" : "is-error"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
