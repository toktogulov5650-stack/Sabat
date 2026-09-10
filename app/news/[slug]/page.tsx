import { notFound } from "next/navigation";
import { newsItems } from "../../data/news";
import { NewsStory } from "./NewsStory";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!newsItems.some((item) => item.slug === slug)) {
    notFound();
  }

  return <NewsStory slug={slug} />;
}
