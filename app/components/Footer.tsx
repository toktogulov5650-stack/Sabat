import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <Image src="/sabat-logo.png" alt="" width={44} height={44} unoptimized />
            <span className="brand-copy">
              <strong>Sabat</strong>
              <small>Фонд Sabat</small>
            </span>
          </Link>
          <p className="footer-note">
            Объединяем людей и поддерживаем важные общественные инициативы.
          </p>
        </div>
        <div className="footer-column">
          <span>Навигация</span>
          <Link href="/about">О нас</Link>
          <Link href="/news">Новости</Link>
          <Link href="/contacts">Контакты</Link>
        </div>
        <div className="footer-column">
          <span>Связаться</span>
          <a href="mailto:info@sabat.kz">info@sabat.kz</a>
          <p>Алматы, Казахстан</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Sabat</span>
        <span>Знания создают возможности</span>
      </div>
      <div className="container footer-wordmark" aria-hidden="true">SABAT</div>
    </footer>
  );
}
