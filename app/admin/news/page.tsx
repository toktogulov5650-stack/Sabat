"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { ArrowIcon, PlusIcon, SearchIcon, TrashIcon } from "../components/icons";
import {
  adminRequest,
  formatAdminDate,
  newsStatusLabels,
  type AdminLanguage,
  type AdminNews,
  type NewsStatus,
  type PagedResult,
} from "../lib/admin-api";

const PAGE_SIZE = 12;
const statusOptions: Array<{ value: "" | NewsStatus; label: string }> = [
  { value: "", label: "Все статусы" },
  { value: "Draft", label: "Черновики" },
  { value: "Published", label: "Опубликованные" },
  { value: "Archived", label: "Архив" },
];

export default function AdminNewsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"" | NewsStatus>("");
  const [language, setLanguage] = useState<AdminLanguage>("ru");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<PagedResult<AdminNews> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError("");
    const query = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE), lang: language });
    if (status) query.set("status", status);
    try {
      setResult(await adminRequest<PagedResult<AdminNews>>(`/api/admin/news?${query}`));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось загрузить новости.");
    } finally {
      setLoading(false);
    }
  }, [page, status, language]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadNews(), 0);
    return () => window.clearTimeout(timer);
  }, [loadNews]);

  const filteredItems = useMemo(() => {
    const items = result?.items ?? [];
    const value = search.trim().toLocaleLowerCase("ru");
    if (!value) return items;
    return items.filter((item) => {
      const translation = item.translations?.find((entry) => entry.language === language);
      return [item.slug, item.author, translation?.title, translation?.category]
        .some((field) => field?.toLocaleLowerCase("ru").includes(value));
    });
  }, [result, search, language]);

  async function changeStatus(item: AdminNews, nextStatus: NewsStatus) {
    if (nextStatus === "Published") {
      const languages = new Set(
        item.translations
          ?.filter((entry) => entry.category && entry.title && entry.excerpt && entry.content)
          .map((entry) => entry.language),
      );
      if (!["ru", "ky", "en"].every((entry) => languages.has(entry as AdminLanguage))) {
        setError("Перед публикацией заполните переводы на русском, кыргызском и английском.");
        return;
      }
    }
    setBusyId(item.id);
    setError("");
    try {
      await adminRequest<AdminNews>(`/api/admin/news/${item.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: nextStatus,
          publishedAt: nextStatus === "Published" ? item.publishedAt ?? new Date().toISOString() : item.publishedAt,
        }),
      });
      await loadNews();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось изменить статус.");
    } finally {
      setBusyId(null);
    }
  }

  async function removeNews(item: AdminNews) {
    if (!window.confirm(`Удалить новость «${item.slug}»? Это действие нельзя отменить.`)) return;
    setBusyId(item.id);
    setError("");
    try {
      await adminRequest<void>(`/api/admin/news/${item.id}`, { method: "DELETE" });
      if ((result?.items?.length ?? 0) === 1 && page > 1) setPage((current) => current - 1);
      else await loadNews();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось удалить новость.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Новости"
        actions={<Link href="/admin/news/new" className="admin-button"><PlusIcon />Новая публикация</Link>}
      />
      {error ? <div className="admin-alert" role="alert">{error}</div> : null}
      <section className="admin-card">
        <div className="admin-toolbar">
          <label className="admin-filter-field admin-search">
            <span className="sr-only">Поиск на странице</span>
            <SearchIcon />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по текущей странице" />
          </label>
          <label className="admin-filter-field">
            <span className="sr-only">Язык заголовков</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as AdminLanguage)}>
              <option value="ru">Русский</option><option value="ky">Кыргызча</option><option value="en">English</option>
            </select>
          </label>
          <label className="admin-filter-field">
            <span className="sr-only">Фильтр по статусу</span>
            <select value={status} onChange={(event) => { setStatus(event.target.value as "" | NewsStatus); setPage(1); }}>
              {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
        {loading ? <div className="admin-loading">Загружаем новости…</div> : filteredItems.length === 0 ? <div className="admin-empty">По выбранным условиям новостей нет.</div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Материал</th><th>Статус</th><th>Языки</th><th>Дата</th><th>Действия</th></tr></thead>
              <tbody>{filteredItems.map((item) => {
                const translation = item.translations?.find((entry) => entry.language === language);
                const languages = item.translations?.filter((entry) => entry.title && entry.content).map((entry) => entry.language.toUpperCase()) ?? [];
                return (
                  <tr key={item.id}>
                    <td><span className="admin-table-title"><strong>{translation?.title || item.slug}</strong><small>{translation?.category || item.categoryKey} · /{item.slug}</small></span></td>
                    <td><span className={`admin-badge ${item.status}`}>{newsStatusLabels[item.status]}</span></td>
                    <td>{languages.join(" · ") || "—"}</td>
                    <td>{formatAdminDate(item.publishedAt ?? item.updatedAt)}</td>
                    <td>
                      <div className="admin-table-actions">
                        {item.status !== "Published" ? <button className="admin-button secondary small" disabled={busyId === item.id} onClick={() => void changeStatus(item, "Published")}>Опубликовать</button> : null}
                        {item.status !== "Archived" ? <button className="admin-button secondary small" disabled={busyId === item.id} onClick={() => void changeStatus(item, "Archived")}>В архив</button> : null}
                        <Link className="admin-icon-button" href={`/admin/news/${item.id}`} aria-label="Редактировать"><ArrowIcon /></Link>
                        <button className="admin-icon-button danger" disabled={busyId === item.id} onClick={() => void removeNews(item)} aria-label="Удалить"><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        )}
        <div className="admin-pagination">
          <span>Показано {filteredItems.length} из {result?.totalCount ?? 0}</span>
          <div className="admin-pagination-controls">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)} aria-label="Предыдущая страница">←</button>
            <span>{page} / {Math.max(result?.totalPages ?? 1, 1)}</span>
            <button type="button" disabled={page >= (result?.totalPages ?? 1) || loading} onClick={() => setPage((current) => current + 1)} aria-label="Следующая страница">→</button>
          </div>
        </div>
      </section>
    </>
  );
}
