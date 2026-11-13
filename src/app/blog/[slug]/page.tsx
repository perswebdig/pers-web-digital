import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/sections/article-body";
import { buildMetadata } from "@/lib/seo";
import { posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return buildMetadata({
    title: `${post.title} | Blog ${post.category}`,
    description: post.excerpt,
    keywords: [...post.tags, post.category],
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return <ArticleBody post={post} />;
}
