import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <Image
            src="/sabat-logo.png"
            alt=""
            width={58}
            height={58}
            unoptimized
          />
          <div>
            <strong>SABAT</strong>
            <span>билим берүү борбору</span>
          </div>
        </div>

        <div>
          <h3>Sabat билим берүү борбору</h3>
          <a href="mailto:sabatfoundation@gmail.com">
            sabatfoundation@gmail.com
          </a>
          <p>© {new Date().getFullYear()}. Все права защищены</p>
        </div>

        <div>
          <h3>Ссылки</h3>
          <Link href="/about">О фонде</Link>
          <Link href="/news">Новости</Link>
          <Link href="/contacts">Контакты</Link>
        </div>

        <div>
          <h3>Наша идея</h3>
          <p>
            Объединять людей вокруг добрых дел и важных общественных
            инициатив.
          </p>
        </div>
      </div>
    </footer>
  );
}
