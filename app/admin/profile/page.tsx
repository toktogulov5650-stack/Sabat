"use client";

import { useState, type FormEvent } from "react";
import { useAdminAuth } from "../components/AdminAuth";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { LogoutIcon } from "../components/icons";
import { adminRequest, formatAdminDate, setCsrfToken, type LoginResponse } from "../lib/admin-api";

export default function AdminProfilePage() {
  const { user, logout, updateUser } = useAdminAuth();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    if (newPassword !== confirmation) {
      setMessage({ type: "error", text: "Новые пароли не совпадают." });
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await adminRequest<LoginResponse>("/api/admin/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCsrfToken(result.csrfToken);
      updateUser(result.admin);
      formElement.reset();
      setMessage({ type: "success", text: "Пароль успешно изменён." });
    } catch (caught) {
      setMessage({ type: "error", text: caught instanceof Error ? caught.message : "Не удалось изменить пароль." });
    } finally {
      setSubmitting(false);
    }
  }

  const initial = (user?.displayName || user?.email || "A").slice(0, 1).toUpperCase();

  return (
    <>
      <AdminPageHeader
        title="Профиль"
        actions={<button className="admin-button danger" type="button" onClick={() => void logout()}><LogoutIcon />Выйти</button>}
      />
      <div className="admin-profile-grid">
        <section className="admin-card admin-profile-person">
          <div className="admin-avatar">{initial}</div>
          <h2>{user?.displayName || "Администратор"}</h2>
          <p>{user?.email}</p>
          <div className="admin-profile-meta">
            <div><span>Аккаунт создан</span><strong>{formatAdminDate(user?.createdAt ?? null)}</strong></div>
            <div><span>Последний вход</span><strong>{formatAdminDate(user?.lastLoginAt ?? null)}</strong></div>
          </div>
        </section>
        <section className="admin-card">
          <div className="admin-card-head"><h2>Сменить пароль</h2></div>
          <form className="admin-password-form" onSubmit={changePassword}>
            {message ? <div className={`admin-alert ${message.type === "success" ? "admin-success" : ""}`} role={message.type === "error" ? "alert" : "status"}>{message.text}</div> : null}
            <label className="admin-field">Текущий пароль<input name="currentPassword" type="password" autoComplete="current-password" required /></label>
            <label className="admin-field">Новый пароль<input name="newPassword" type="password" autoComplete="new-password" minLength={8} required /><span className="admin-field-hint">Не менее 8 символов.</span></label>
            <label className="admin-field">Повторите новый пароль<input name="confirmation" type="password" autoComplete="new-password" minLength={8} required /></label>
            <div><button className="admin-button" type="submit" disabled={submitting}>{submitting ? "Меняем пароль…" : "Обновить пароль"}</button></div>
          </form>
        </section>
      </div>
    </>
  );
}
