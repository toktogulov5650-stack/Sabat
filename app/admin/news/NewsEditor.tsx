"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { TrashIcon, UploadIcon } from "../components/icons";
import {
  adminRequest,
  type AdminLanguage,
  type AdminNews,
  type NewsStatus,
  type NewsTranslation,
  type UpsertNews,
} from "../lib/admin-api";

const languages: Array<{ value: AdminLanguage; label: string }> = [
  { value: "ru", label: "Русский" },
  { value: "ky", label: "Кыргызча" },
  { value: "en", label: "English" },
];

function emptyTranslation(language: AdminLanguage): NewsTranslation {
  return { language, category: "", title: "", excerpt: "", content: "" };
}

function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function NewsEditor({ id }: { id?: string }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [activeLanguage, setActiveLanguage] = useState<AdminLanguage>("ru");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryKey, setCategoryKey] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [status, setStatus] = useState<NewsStatus>("Draft");
  const [publishedAt, setPublishedAt] = useState("");
  const [translations, setTranslations] = useState<Record<AdminLanguage, NewsTranslation>>({
    ru: emptyTranslation("ru"), ky: emptyTranslation("ky"), en: emptyTranslation("en"),
  });

  useEffect(() => {
    if (!id) return;
    let active = true;
    adminRequest<AdminNews>(`/api/admin/news/${id}`)
      .then((item) => {
        if (!active) return;
        setSlug(item.slug ?? "");
        setCategoryKey(item.categoryKey ?? "");
        setAuthor(item.author ?? "");
        setCoverImageUrl(item.coverImageUrl ?? "");
        setStatus(item.status);
        setPublishedAt(toDateTimeLocal(item.publishedAt));
        setTranslations({
          ru: item.translations?.find((entry) => entry.language === "ru") ?? emptyTranslation("ru"),
          ky: item.translations?.find((entry) => entry.language === "ky") ?? emptyTranslation("ky"),
          en: item.translations?.find((entry) => entry.language === "en") ?? emptyTranslation("en"),
        });
      })
      .catch((caught) => active && setError(caught instanceof Error ? caught.message : "Не удалось загрузить новость."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const currentTranslation = translations[activeLanguage];
  const completeLanguages = useMemo(
    () => new Set(languages.filter(({ value }) => {
      const item = translations[value];
      return item.category.trim() && item.title.trim() && item.excerpt.trim() && item.content.trim();
    }).map(({ value }) => value)),
    [translations],
  );

  function updateTranslation(field: keyof Omit<NewsTranslation, "language">, value: string) {
    setTranslations((current) => ({
      ...current,
      [activeLanguage]: { ...current[activeLanguage], [field]: value },
    }));
  }

  async function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Можно загрузить только JPEG, PNG или WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Файл больше 5 МБ. Выберите изображение меньшего размера.");
      return;
    }
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    try {
      const result = await adminRequest<{ url: string }>("/api/admin/news/images", { method: "POST", body: form });
      setCoverImageUrl(result.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось загрузить изображение.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (status === "Published" && completeLanguages.size !== 3) {
      setError("Для публикации заполните все поля перевода на русском, кыргызском и английском.");
      return;
    }
    const payload: UpsertNews = {
      slug: slug.trim(),
      categoryKey: categoryKey.trim(),
      author: author.trim() || null,
      coverImageUrl: coverImageUrl.trim() || null,
      status,
      publishedAt: status === "Published" ? (publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()) : null,
      translations: languages.map(({ value }) => ({
        ...translations[value],
        category: translations[value].category.trim(),
        title: translations[value].title.trim(),
        excerpt: translations[value].excerpt.trim(),
        content: translations[value].content.trim(),
      })),
    };
    setSaving(true);
    try {
      const saved = await adminRequest<AdminNews>(id ? `/api/admin/news/${id}` : "/api/admin/news", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      router.replace(`/admin/news/${saved.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось сохранить новость.");
      setSaving(false);
    }
  }

  if (loading) return <div className="admin-loading">Загружаем редактор…</div>;

  return (
    <form onSubmit={handleSubmit}>
      <AdminPageHeader
        title={id ? "Редактировать новость" : "Создать новость"}
      />
      {error ? <div className="admin-alert" role="alert">{error}</div> : null}
      <div className="admin-form-grid">
        <section className="admin-card">
          <div className="admin-card-head"><h2>Переводы</h2><span className="admin-field-hint">{completeLanguages.size} из 3 заполнено</span></div>
          <div className="admin-language-tabs" role="tablist">
            {languages.map(({ value, label }) => <button key={value} type="button" className={activeLanguage === value ? "active" : ""} onClick={() => setActiveLanguage(value)} role="tab" aria-selected={activeLanguage === value}>{label}{completeLanguages.has(value) ? <span className="admin-language-ok" /> : null}</button>)}
          </div>
          <div className="admin-form-section admin-fields-grid" role="tabpanel">
            <label className="admin-field full">Категория<input value={currentTranslation.category} onChange={(event) => updateTranslation("category", event.target.value)} placeholder="Например: Образование" required={status === "Published"} /></label>
            <label className="admin-field full">Заголовок<input value={currentTranslation.title} onChange={(event) => updateTranslation("title", event.target.value)} placeholder="Заголовок новости" required={status === "Published"} /></label>
            <label className="admin-field full">Краткое описание<textarea value={currentTranslation.excerpt} onChange={(event) => updateTranslation("excerpt", event.target.value)} placeholder="Короткий анонс для карточки новости" required={status === "Published"} /></label>
            <label className="admin-field full">Текст новости<textarea className="admin-content-input" value={currentTranslation.content} onChange={(event) => updateTranslation("content", event.target.value)} placeholder="Полный текст публикации" required={status === "Published"} /></label>
          </div>
        </section>
        <div className="admin-form-stack">
          <section className="admin-card">
            <div className="admin-card-head"><h2>Публикация</h2></div>
            <div className="admin-form-section admin-fields-grid">
              <label className="admin-field full">Slug<input value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="news-title" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /><span className="admin-field-hint">Латиница, цифры и дефисы.</span></label>
              <label className="admin-field full">Ключ категории<input value={categoryKey} onChange={(event) => setCategoryKey(event.target.value)} placeholder="education" required /></label>
              <label className="admin-field full">Автор<input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder={'Общественный фонд "Сабат"'} /></label>
              <label className="admin-field full">Статус<select value={status} onChange={(event) => setStatus(event.target.value as NewsStatus)}><option value="Draft">Черновик</option><option value="Published">Опубликовано</option><option value="Archived">В архиве</option></select></label>
              {status === "Published" ? <label className="admin-field full">Дата публикации<input type="datetime-local" value={publishedAt} onChange={(event) => setPublishedAt(event.target.value)} /></label> : null}
            </div>
          </section>
          <section className="admin-card">
            <div className="admin-card-head"><h2>Обложка</h2></div>
            <div className="admin-form-section">
              {coverImageUrl ? (
                <div className="admin-cover-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImageUrl} alt="Предпросмотр обложки" />
                  <button type="button" className="admin-icon-button danger" onClick={() => setCoverImageUrl("")} aria-label="Удалить обложку"><TrashIcon /></button>
                </div>
              ) : (
                <label className="admin-upload"><input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadCover} disabled={uploading} /><span><UploadIcon />{uploading ? "Загружаем…" : "JPEG, PNG или WebP до 5 МБ"}</span></label>
              )}
              {coverImageUrl ? <label className="admin-field" style={{ marginTop: 14 }}>URL обложки<input value={coverImageUrl} onChange={(event) => setCoverImageUrl(event.target.value)} /></label> : null}
            </div>
          </section>
        </div>
      </div>
      <div className="admin-editor-actions">
        <Link href="/admin/news" className="admin-button secondary">Отмена</Link>
        <button className="admin-button" type="submit" disabled={saving || uploading}>{saving ? "Сохраняем…" : id ? "Сохранить изменения" : "Создать новость"}</button>
      </div>
    </form>
  );
}
