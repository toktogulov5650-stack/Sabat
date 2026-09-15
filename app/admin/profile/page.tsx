"use client";

import { useState, type FormEvent } from "react";
import { useAdminAuth } from "../components/AdminAuth";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { LogoutIcon } from "../components/icons";
import { AdminApiError, adminRequest, formatAdminDate, setCsrfToken, type LoginResponse } from "../lib/admin-api";

type PasswordField = "currentPassword" | "newPassword" | "confirmation";
type PasswordErrors = Partial<Record<PasswordField, string>>;

export default function AdminProfilePage() {
  const { user, logout, updateUser } = useAdminAuth();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<PasswordErrors>({});

  function clearFieldError(field: PasswordField) {
    if (!fieldErrors[field]) return;
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");

    const validationErrors: PasswordErrors = {};

    if (!currentPassword) validationErrors.currentPassword = "Введите текущий пароль.";

    const missingRequirements = [
      newPassword.length < 12 ? "не менее 12 символов" : null,
      !/[A-ZА-ЯЁ]/.test(newPassword) ? "заглавную букву" : null,
      !/[a-zа-яё]/.test(newPassword) ? "строчную букву" : null,
      !/\d/.test(newPassword) ? "цифру" : null,
      !/[^A-Za-zА-Яа-яЁё0-9\s]/.test(newPassword) ? "специальный символ" : null,
    ].filter(Boolean);

    if (missingRequirements.length > 0) {
      validationErrors.newPassword = `Добавьте: ${missingRequirements.join(", ")}.`;
    } else if (newPassword === currentPassword) {
      validationErrors.newPassword = "Новый пароль должен отличаться от текущего.";
    }

    if (newPassword !== confirmation) {
      validationErrors.confirmation = "Новые пароли не совпадают.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setMessage(null);
      return;
    }

    setSubmitting(true);
    setMessage(null);
    setFieldErrors({});
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
      if (caught instanceof AdminApiError) {
        const backendErrors: PasswordErrors = {
          currentPassword: caught.fieldErrors.currentPassword?.join(" "),
          newPassword: caught.fieldErrors.newPassword?.join(" "),
        };
        const hasFieldErrors = Object.values(backendErrors).some(Boolean);
        setFieldErrors(hasFieldErrors ? backendErrors : {});
        setMessage(hasFieldErrors ? null : { type: "error", text: caught.message });
      } else {
        setMessage({ type: "error", text: caught instanceof Error ? caught.message : "Не удалось изменить пароль." });
      }
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
            <label className="admin-field">Текущий пароль<input name="currentPassword" type="password" autoComplete="current-password" aria-invalid={Boolean(fieldErrors.currentPassword)} aria-describedby={fieldErrors.currentPassword ? "current-password-error" : undefined} onChange={() => clearFieldError("currentPassword")} required />{fieldErrors.currentPassword ? <span className="admin-field-error" id="current-password-error">{fieldErrors.currentPassword}</span> : null}</label>
            <label className="admin-field">Новый пароль<input name="newPassword" type="password" autoComplete="new-password" minLength={12} aria-invalid={Boolean(fieldErrors.newPassword)} aria-describedby={fieldErrors.newPassword ? "new-password-hint new-password-error" : "new-password-hint"} onChange={() => clearFieldError("newPassword")} required /><span className="admin-field-hint" id="new-password-hint">Минимум 12 символов: заглавная и строчная буквы, цифра и специальный символ.</span>{fieldErrors.newPassword ? <span className="admin-field-error" id="new-password-error">{fieldErrors.newPassword}</span> : null}</label>
            <label className="admin-field">Повторите новый пароль<input name="confirmation" type="password" autoComplete="new-password" minLength={12} aria-invalid={Boolean(fieldErrors.confirmation)} aria-describedby={fieldErrors.confirmation ? "confirmation-error" : undefined} onChange={() => clearFieldError("confirmation")} required />{fieldErrors.confirmation ? <span className="admin-field-error" id="confirmation-error">{fieldErrors.confirmation}</span> : null}</label>
            <div><button className="admin-button" type="submit" disabled={submitting}>{submitting ? "Меняем пароль…" : "Обновить пароль"}</button></div>
          </form>
        </section>
      </div>
    </>
  );
}
