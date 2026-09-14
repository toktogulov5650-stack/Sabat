"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ArrowIcon, MailIcon, NewsIcon } from "./components/icons";
import {
  adminRequest,
  formatAdminDate,
  newsStatusLabels,
  type AdminNews,
  type ContactMessage,
  type PagedResult,
} from "./lib/admin-api";

type DashboardData = {
  news: number;
  published: number;
  drafts: number;
  newMessages: number;
  recent: AdminNews[];
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      adminRequest<PagedResult<AdminNews>>("/api/admin/news?page=1&pageSize=5"),
      adminRequest<PagedResult<AdminNews>>("/api/admin/news?status=Published&page=1&pageSize=1"),
      adminRequest<PagedResult<AdminNews>>("/api/admin/news?status=Draft&page=1&pageSize=1"),
      adminRequest<PagedResult<ContactMessage>>("/api/admin/contacts?status=New&page=1&pageSize=1"),
    ])
      .then(([allNews, published, drafts, messages]) => {
        if (!active) return;
        setData({
          news: allNews.totalCount,
          published: published.totalCount,
          drafts: drafts.totalCount,
          newMessages: messages.totalCount,
          recent: allNews.items ?? [],
        });
      })
      .catch((caught) => active && setError(caught instanceof Error ? caught.message : "Не удалось загрузить обзор."));
    return () => { active = false; };
  }, []);

  const stats = [
    { label: "Всего новостей", value: data?.news, icon: NewsIcon },
    { label: "Опубликовано", value: data?.published, icon: NewsIcon },
    { label: "Черновики", value: data?.drafts, icon: NewsIcon },
    { label: "Новые сообщения", value: data?.newMessages, icon: MailIcon },
  ];

  return (
    <>
      <AdminPageHeader
        title="Обзор"
      />
      {error ? <div className="admin-alert" role="alert">{error}</div> : null}
      <section className="admin-stats" aria-label="Статистика">
        {stats.map(({ label, value, icon: StatIcon }) => (
          <article className="admin-card admin-stat" key={label}>
            <div className="admin-stat-top"><span>{label}</span><span className="admin-stat-icon"><StatIcon /></span></div>
            <strong>{value ?? "—"}</strong>
          </article>
        ))}
      </section>
      <section>
        <article className="admin-card">
          <div className="admin-card-head"><h2>Последние новости</h2><Link href="/admin/news" className="admin-button secondary small">Все новости</Link></div>
          {!data ? <div className="admin-loading">Загрузка…</div> : data.recent.length === 0 ? <div className="admin-empty">Новостей пока нет.</div> : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Материал</th><th>Статус</th><th>Обновлено</th><th /></tr></thead>
                <tbody>{data.recent.map((item) => {
                  const ru = item.translations?.find((translation) => translation.language === "ru");
                  return (
                    <tr key={item.id}>
                      <td><span className="admin-table-title"><strong>{ru?.title || item.slug}</strong><small>/{item.slug}</small></span></td>
                      <td><span className={`admin-badge ${item.status}`}>{newsStatusLabels[item.status]}</span></td>
                      <td>{formatAdminDate(item.updatedAt)}</td>
                      <td><Link className="admin-icon-button" href={`/admin/news/${item.id}`} aria-label="Редактировать"><ArrowIcon /></Link></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
