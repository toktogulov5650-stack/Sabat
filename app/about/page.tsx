import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "О фонде",
  description: 'Миссия, образовательная модель и стратегия Общественного фонда "Сабат" до 2035 года.',
};

export default function AboutPage() {
  return <AboutContent />;
}
