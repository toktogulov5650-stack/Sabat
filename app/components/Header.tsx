"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/", label: { ru: "Главная", kk: "Басты бет" } },
  { href: "/about", label: { ru: "О фонде", kk: "Қор туралы" } },
  { href: "/news", label: { ru: "Новости", kk: "Жаңалықтар" } },
  { href: "/contacts", label: { ru: "Контакты", kk: "Байланыстар" } },
];

type Language = "ru" | "kk";

export function Header() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>("ru");
  const languageSwitcherRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;
    if (savedLanguage === "ru" || savedLanguage === "kk") setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    function closeLanguageSwitcher(event: PointerEvent) {
      if (!languageSwitcherRef.current?.contains(event.target as Node)) languageSwitcherRef.current?.removeAttribute("open");
    }

    document.addEventListener("pointerdown", closeLanguageSwitcher);
    return () => document.removeEventListener("pointerdown", closeLanguageSwitcher);
  }, []);

  function changeLanguage(nextLanguage: Language) {
    window.localStorage.setItem("sabat-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
    languageSwitcherRef.current?.removeAttribute("open");
    setLanguage(nextLanguage);
    window.dispatchEvent(new CustomEvent("sabat-language-change", { detail: nextLanguage }));
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Sabat — главная">
          <Image src="/sabat-logo.png" alt="" width={52} height={52} priority unoptimized />
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => <Link className={pathname === item.href ? "active" : ""} href={item.href} key={item.href}>{item.label[language]}</Link>)}
        </nav>
        <details className="language-switcher" ref={languageSwitcherRef}>
          <summary aria-label="Выбрать язык">
            <svg className="language-globe" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.1 2.3 3.2 5.2 3.2 8.5S14.1 18.2 12 20.5C9.9 18.2 8.8 15.3 8.8 12S9.9 5.8 12 3.5Z" /></svg>
            <span className="language-code">{language === "ru" ? "RU" : "ҚАЗ"}</span>
            <svg className="language-chevron" aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m2.5 4.5 3.5 3 3.5-3" /></svg>
          </summary>
          <div className="language-options">
            <button className={language === "ru" ? "selected" : ""} type="button" onClick={() => changeLanguage("ru")}>Русский</button>
            <button className={language === "kk" ? "selected" : ""} type="button" onClick={() => changeLanguage("kk")}>Қазақша</button>
          </div>
        </details>
        <details className="mobile-menu"><summary aria-label="Открыть меню"><span /><span /><span /></summary><nav>{navigation.map((item)=><Link href={item.href} key={item.href}>{item.label[language]}</Link>)}</nav></details>
      </div>
    </header>
  );
}
