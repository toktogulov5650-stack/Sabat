"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { GridIcon, MailIcon, MenuIcon, NewsIcon, UserIcon } from "./icons";

const links = [
  { href: "/admin", label: "Обзор", icon: GridIcon, exact: true },
  { href: "/admin/news", label: "Новости", icon: NewsIcon },
  { href: "/admin/contacts", label: "Сообщения", icon: MailIcon },
  { href: "/admin/profile", label: "Профиль", icon: UserIcon },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) return children;

  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <Link href="/admin" className="admin-brand" aria-label={'Общественный фонд "Сабат" — панель управления'}>
          <Image src="/sabat-logo.png" alt="" width={63} height={45} unoptimized />
          <strong>Общественный фонд &quot;Сабат&quot;</strong>
        </Link>
        <nav className="admin-nav" aria-label="Разделы панели управления">
          <span className="admin-nav-label">Рабочая область</span>
          {links.map(({ href, label, icon: NavIcon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={active ? "active" : ""} onClick={() => setMenuOpen(false)}>
                <NavIcon />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      {menuOpen ? <button className="admin-sidebar-backdrop" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)} /> : null}
      <div className="admin-main-column">
        <header className="admin-mobile-header">
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><MenuIcon /></button>
          <span>Общественный фонд &quot;Сабат&quot;</span>
        </header>
        <main id="main-content" className="admin-main">{children}</main>
      </div>
    </div>
  );
}
