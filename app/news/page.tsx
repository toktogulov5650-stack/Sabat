import type { Metadata } from "next";
import { NewsArchive } from "./NewsArchive";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости, события и истории образовательного фонда Sabat.",
};

export default function NewsPage() {
  return <NewsArchive />;
}
