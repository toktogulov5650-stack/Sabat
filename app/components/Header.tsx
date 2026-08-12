"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О фонде" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Sabat — главная">
          <Image src="/sabat-logo.png" alt="" width={52} height={52} priority unoptimized />
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => <Link className={pathname === item.href ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="header-action" href="/contacts">Присоединиться</Link>
        <details className="mobile-menu"><summary aria-label="Открыть меню"><span /><span /><span /></summary><nav>{navigation.map((item)=><Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></details>
      </div>
    </header>
  );
}
