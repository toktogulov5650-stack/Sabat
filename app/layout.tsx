import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

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
      url: origin,
      images: [{ url: `${origin}/og-sand.png`, width: 1200, height: 630, alt: "Sabat — объединяем людей вокруг важных дел" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sabat — фонд общественных инициатив",
      description: "Объединяем людей вокруг важных дел.",
      images: [`${origin}/og-sand.png`],
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
