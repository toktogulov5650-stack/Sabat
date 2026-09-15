"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Language = "ru" | "ky" | "en";

const navigation = [
  {
    href: "/",
    label: {
      ru: "Главная",
      ky: "Башкы бет",
      en: "Home",
    },
  },
  {
    href: "/about",
    label: {
      ru: "О фонде",
      ky: "Фонд жөнүндө",
      en: "About",
    },
  },
  {
    href: "/news",
    label: {
      ru: "Новости",
      ky: "Жаңылыктар",
      en: "News",
    },
  },
  {
    href: "/contacts",
    label: {
      ru: "Контакты",
      ky: "Байланыш",
      en: "Contacts",
    },
  },
];

const languageLabels = {
  ru: {
    code: "RU",
    name: "Русский",
  },

  ky: {
    code: "KG",
    name: "Кыргызча",
  },

  en: {
    code: "EN",
    name: "English",
  },
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [language, setLanguage] = useState<Language>("ru");

  const languageSwitcherRef = useRef<HTMLDetailsElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  /* Получаем сохранённый язык */
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      "sabat-language"
    ) as Language | null;

    if (
      savedLanguage === "ru" ||
      savedLanguage === "ky" ||
      savedLanguage === "en"
    ) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  /* Загружаем страницы меню заранее, когда браузер свободен */
  useEffect(() => {
    const prefetchNavigation = () => {
      navigation.forEach((item) => {
        if (item.href !== pathname) router.prefetch(item.href);
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetchNavigation, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(prefetchNavigation, 250);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, router]);

  /* Закрываем меню при клике снаружи */
  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target as Node;

      if (!languageSwitcherRef.current?.contains(target)) {
        languageSwitcherRef.current?.removeAttribute("open");
      }

      if (!mobileMenuRef.current?.contains(target)) {
        mobileMenuRef.current?.removeAttribute("open");
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  /* Переключение языка */
  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);

    window.localStorage.setItem(
      "sabat-language",
      nextLanguage
    );

    document.documentElement.lang = nextLanguage;

    languageSwitcherRef.current?.removeAttribute("open");

    window.dispatchEvent(
      new CustomEvent("sabat-language-change", {
        detail: nextLanguage,
      })
    );
  }

  function prepareRoute(href: string) {
    if (href !== pathname) router.prefetch(href);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* LOGO */}
        <Link
          className="brand"
          href="/"
          aria-label="Sabat — главная"
          prefetch
          onPointerEnter={() => prepareRoute("/")}
          onFocus={() => prepareRoute("/")}
        >
          <Image
            src="/sabat-logo.png"
            alt="Sabat"
            width={91}
            height={65}
            priority
            unoptimized
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="desktop-nav"
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              onPointerEnter={() => prepareRoute(item.href)}
              onFocus={() => prepareRoute(item.href)}
              className={
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                  ? "active"
                  : ""
              }
            >
              {item.label[language]}
            </Link>
          ))}
        </nav>

        {/* LANGUAGE SWITCHER */}
        <details
          className="language-switcher"
          ref={languageSwitcherRef}
        >
          <summary aria-label="Выбрать язык">

            {/* Globe icon */}
            <svg
              className="language-globe"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="8.5"
              />

              <path d="M3.5 12h17" />

              <path d="M12 3.5c2.2 2.35 3.3 5.18 3.3 8.5S14.2 18.15 12 20.5" />

              <path d="M12 3.5C9.8 5.85 8.7 8.68 8.7 12s1.1 6.15 3.3 8.5" />
            </svg>

            {/* Current language */}
            <span className="language-code">
              {languageLabels[language].code}
            </span>

            {/* Chevron */}
            <svg
              className="language-chevron"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M4 6.5 8 10l4-3.5" />
            </svg>

          </summary>

          {/* Dropdown */}
          <div className="language-options">

            <button
              type="button"
              className={
                language === "ky"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                changeLanguage("ky")
              }
            >
              Кыргызча
            </button>

            <button
              type="button"
              className={
                language === "ru"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                changeLanguage("ru")
              }
            >
              Русский
            </button>

            <button
              type="button"
              className={
                language === "en"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                changeLanguage("en")
              }
            >
              English
            </button>

          </div>
        </details>

        {/* MOBILE MENU */}
        <details
          className="mobile-menu"
          ref={mobileMenuRef}
        >
          <summary aria-label="Открыть меню">
            <span />
            <span />
            <span />
          </summary>

          <nav>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onPointerEnter={() => prepareRoute(item.href)}
                onFocus={() => prepareRoute(item.href)}
                onClick={() => {
                  mobileMenuRef.current?.removeAttribute("open");
                }}
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>
        </details>

      </div>
    </header>
  );
}
