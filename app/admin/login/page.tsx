"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useAdminAuth } from "../components/AdminAuth";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");

    try {
      await login(String(form.get("email") ?? "").trim(), String(form.get("password") ?? ""));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось войти.");
      setSubmitting(false);
    }
  }

  return (
    <main id="main-content" className="admin-login">
      <section className="admin-login-panel">
        <div className="admin-login-brand">
          <Image src="/sabat-logo.png" alt="" width={70} height={50} priority unoptimized />
        </div>
        <div className="admin-login-copy">
          <h1>Добро пожаловать</h1>
          {error ? <div className="admin-alert" role="alert">{error}</div> : null}
          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              Email
              <input name="email" type="email" autoComplete="username" placeholder="admin@example.com" required autoFocus />
            </label>
            <label className="admin-field">
              Пароль
              <input name="password" type="password" autoComplete="current-password" placeholder="Введите пароль" required />
            </label>
            <button className="admin-button" type="submit" disabled={submitting}>
              {submitting ? "Входим…" : "Войти в панель"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
