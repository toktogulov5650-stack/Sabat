import { NewsStory } from "./NewsStory";

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NewsStory slug={slug} />;
}
