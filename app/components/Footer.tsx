import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity"><Image src="/sabat-logo.png" alt="" width={58} height={58} unoptimized /><div><strong>SABAT</strong><span>общественный фонд</span></div></div>
        <div><h3>Фонд Sabat</h3><a href="mailto:info@sabat.kz">info@sabat.kz</a><p>© {new Date().getFullYear()}. Все права защищены</p></div>
        <div><h3>Полезные ссылки</h3><Link href="/about">О фонде</Link><Link href="/news">Новости</Link><Link href="/contacts">Контакты</Link></div>
        <div><h3>Наша идея</h3><p>Объединять людей вокруг добрых дел и важных общественных инициатив.</p></div>
      </div>
    </footer>
  );
}
