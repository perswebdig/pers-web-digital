import { corePosts, type Post } from "./posts";
import { extraPosts } from "./posts.more";

/**
 * Índice do blog: mescla os artigos núcleo com os artigos adicionais
 * de `posts.more.ts`, remove slugs repetidos e ordena por data.
 */
const seen = new Set<string>();

export const posts: Post[] = [...corePosts, ...extraPosts]
  .filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export const featuredPost = posts.find((post) => post.featured) ?? posts[0];

export const postCategories = Array.from(new Set(posts.map((post) => post.category)));

export const relatedPosts = (post: Post, limit = 3): Post[] =>
  posts
    .filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) =>
        (b.category === post.category ? 1 : 0) +
        b.tags.filter((t) => post.tags.includes(t)).length -
        ((a.category === post.category ? 1 : 0) +
          a.tags.filter((t) => post.tags.includes(t)).length),
    )
    .slice(0, limit);
