"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Sabat — главная">
          <Image src="/sabat-logo.png" alt="" width={46} height={46} priority unoptimized />
          <span className="brand-copy">
            <strong>Sabat</strong>
              <small>Фонд Sabat</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <Link
              className={pathname === item.href ? "active" : undefined}
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-contact" href="/contacts">
          Связаться <span aria-hidden="true">↗</span>
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Открыть меню">
            <span></span><span></span>
          </summary>
          <nav aria-label="Мобильная навигация">
            {navigation.map((item) => (
              <Link
                className={pathname === item.href ? "active" : undefined}
                href={item.href}
                key={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
