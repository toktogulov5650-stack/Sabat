"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { CloseIcon, TrashIcon } from "../components/icons";
import {
  adminRequest,
  contactStatusLabels,
  formatAdminDate,
  type ContactMessage,
  type ContactStatus,
  type PagedResult,
} from "../lib/admin-api";

const PAGE_SIZE = 15;
const statusOptions: Array<{ value: "" | ContactStatus; label: string }> = [
  { value: "", label: "Все статусы" },
  { value: "New", label: "Новые" },
  { value: "InProgress", label: "В работе" },
  { value: "Resolved", label: "Решённые" },
  { value: "Spam", label: "Спам" },
];

export default function AdminContactsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"" | ContactStatus>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<PagedResult<ContactMessage> | null>(null);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError("");
    const query = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
    if (status) query.set("status", status);
    if (from) query.set("from", new Date(`${from}T00:00:00`).toISOString());
    if (to) query.set("to", new Date(`${to}T23:59:59.999`).toISOString());
    try {
      setResult(await adminRequest<PagedResult<ContactMessage>>(`/api/admin/contacts?${query}`));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось загрузить сообщения.");
    } finally {
      setLoading(false);
    }
  }, [page, status, from, to]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadContacts(), 0);
    return () => window.clearTimeout(timer);
  }, [loadContacts]);

  async function openMessage(message: ContactMessage) {
    setSelected(message);
    setDetailLoading(true);
    try {
      setSelected(await adminRequest<ContactMessage>(`/api/admin/contacts/${message.id}`));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось открыть сообщение.");
    } finally {
      setDetailLoading(false);
    }
  }

  async function changeStatus(nextStatus: ContactStatus) {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      const updated = await adminRequest<ContactMessage>(`/api/admin/contacts/${selected.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setSelected(updated);
      await loadContacts();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось изменить статус.");
    } finally {
      setBusy(false);
    }
  }

  async function removeMessage() {
    if (!selected || !window.confirm("Удалить это сообщение? Это действие нельзя отменить.")) return;
    setBusy(true);
    setError("");
    try {
      await adminRequest<void>(`/api/admin/contacts/${selected.id}`, { method: "DELETE" });
      setSelected(null);
      if ((result?.items?.length ?? 0) === 1 && page > 1) setPage((current) => current - 1);
      else await loadContacts();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось удалить сообщение.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AdminPageHeader title="Сообщения" />
      {error ? <div className="admin-alert" role="alert">{error}</div> : null}
      <section className="admin-card">
        <div className="admin-toolbar">
          <label className="admin-filter-field">Статус<select value={status} onChange={(event) => { setStatus(event.target.value as "" | ContactStatus); setPage(1); }}>{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className="admin-filter-field">С даты<input type="date" value={from} max={to || undefined} onChange={(event) => { setFrom(event.target.value); setPage(1); }} /></label>
          <label className="admin-filter-field">По дату<input type="date" value={to} min={from || undefined} onChange={(event) => { setTo(event.target.value); setPage(1); }} /></label>
          {(status || from || to) ? <button className="admin-button secondary small" type="button" onClick={() => { setStatus(""); setFrom(""); setTo(""); setPage(1); }}>Сбросить</button> : null}
        </div>
        {loading ? <div className="admin-loading">Загружаем сообщения…</div> : (result?.items?.length ?? 0) === 0 ? <div className="admin-empty">Сообщений по выбранным условиям нет.</div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Отправитель</th><th>Сообщение</th><th>Язык</th><th>Статус</th><th>Дата</th></tr></thead>
              <tbody>{result?.items?.map((message) => (
                <tr className="admin-contact-row" key={message.id} onClick={() => void openMessage(message)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") void openMessage(message); }}>
                  <td><span className="admin-table-title"><strong>{message.name || "Без имени"}</strong><small>{message.email || "—"}</small></span></td>
                  <td><div className="admin-contact-preview">{message.message || "—"}</div></td>
                  <td>{message.language?.toUpperCase() || "—"}</td>
                  <td><span className={`admin-badge ${message.status}`}>{contactStatusLabels[message.status]}</span></td>
                  <td>{formatAdminDate(message.createdAt)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <div className="admin-pagination">
          <span>Всего сообщений: {result?.totalCount ?? 0}</span>
          <div className="admin-pagination-controls">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)} aria-label="Предыдущая страница">←</button>
            <span>{page} / {Math.max(result?.totalPages ?? 1, 1)}</span>
            <button type="button" disabled={page >= (result?.totalPages ?? 1) || loading} onClick={() => setPage((current) => current + 1)} aria-label="Следующая страница">→</button>
          </div>
        </div>
      </section>
      {selected ? (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title">
            <header className="admin-modal-head">
              <div><h2 id="contact-dialog-title">{selected.name || "Без имени"}</h2><p>{selected.email || "Email не указан"} · {formatAdminDate(selected.createdAt)}</p></div>
              <button className="admin-icon-button" type="button" onClick={() => setSelected(null)} aria-label="Закрыть"><CloseIcon /></button>
            </header>
            <div className="admin-modal-body">
              {detailLoading ? <div className="admin-loading">Загружаем сообщение…</div> : <p className="admin-message-text">{selected.message || "Сообщение пустое."}</p>}
              <div className="admin-modal-actions">
                <label className="admin-field">Статус<select value={selected.status} disabled={busy} onChange={(event) => void changeStatus(event.target.value as ContactStatus)}>{statusOptions.slice(1).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                <button className="admin-button danger" type="button" disabled={busy} onClick={() => void removeMessage()}><TrashIcon />Удалить</button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
