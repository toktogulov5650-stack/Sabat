"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "ru" | "ky" | "en";

const foundationNames: Record<Language, string> = {
  ru: 'Общественный фонд "Сабат"',
  ky: '"Сабат" коомдук фонду',
  en: "Sabat Public Foundation",
};

export function Footer() {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("sabat-language") as Language | null;

    if (savedLanguage === "ru" || savedLanguage === "ky" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      setLanguage((event as CustomEvent<Language>).detail);
    };

    window.addEventListener("sabat-language-change", handleLanguageChange);
    return () => window.removeEventListener("sabat-language-change", handleLanguageChange);
  }, []);

  const foundationName = foundationNames[language];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <Image
            src="/sabat-logo.png"
            alt=""
            width={92}
            height={65}
            unoptimized
          />
          <div>
            <strong>{foundationName}</strong>
          </div>
        </div>

        <div>
          <h3>{foundationName}</h3>
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
