import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "../data/news";

export function NewsCard({ item, detailed = false }: { item: NewsItem; detailed?: boolean }) {
  return (
    <article className="news-card">
      <div className="news-cover">
        <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized />
        <span>{item.category}</span>
      </div>
      <div className="news-card-body">
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
