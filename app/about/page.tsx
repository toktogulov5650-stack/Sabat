import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "О фонде",
  description: "Миссия, образовательная модель и стратегия общественного фонда Sabat до 2035 года.",
};

export default function AboutPage() {
  return <AboutContent />;
}
