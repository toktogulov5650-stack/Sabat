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
      default: "Sabat — образовательный фонд",
      template: "%s | Sabat",
    },
    description:
      "Sabat создаёт образовательные инициативы и поддерживает людей, которые хотят учиться и развиваться.",
    icons: {
      icon: "/sabat-logo.png",
      shortcut: "/sabat-logo.png",
    },
    openGraph: {
      title: "Sabat — образовательный фонд",
      description: "Знания создают возможности.",
      type: "website",
      locale: "ru_RU",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sabat — образовательный фонд",
      description: "Знания создают возможности.",
      images: [`${origin}/og.png`],
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
