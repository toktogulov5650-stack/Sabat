import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Sabat — фонд общественных инициатив",
      template: "%s | Sabat",
    },
    description:
      "Sabat объединяет людей, поддерживает общественные инициативы и создаёт пространство для добрых перемен.",
    icons: {
      icon: "/sabat-logo.png",
      shortcut: "/sabat-logo.png",
    },
    openGraph: {
      title: "Sabat — фонд общественных инициатив",
      description: "Объединяем людей вокруг важных дел.",
      type: "website",
      locale: "ru_RU",
    },
    twitter: {
      card: "summary",
      title: "Sabat — фонд общественных инициатив",
      description: "Объединяем людей вокруг важных дел.",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={manrope.variable}>
        <a className="skip-link" href="#main-content">Перейти к содержанию</a>
        {children}
      </body>
    </html>
  );
}
