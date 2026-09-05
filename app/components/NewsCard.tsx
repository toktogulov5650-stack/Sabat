import Link from "next/link";
import type { NewsItem } from "../data/news";

export function NewsCard({ item, detailed = false }: { item: NewsItem; detailed?: boolean }) {
  return (
    <article className="news-card">
      <div className="news-image-placeholder" aria-hidden="true" />
      <div className="news-card-body">
        <span>{item.category}</span>
        <time>{item.date}</time>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        {detailed ? (
          <details className="news-details">
            <summary>Читать полностью <span aria-hidden="true">＋</span></summary>
            <p>{item.body}</p>
          </details>
        ) : (
          <Link href={`/news#${item.slug}`} aria-label={`Подробнее: ${item.title}`}>
            Подробнее <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
