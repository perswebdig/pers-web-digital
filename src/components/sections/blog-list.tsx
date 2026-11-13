"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { posts as allPosts, postCategories } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function BlogList() {
  const [category, setCategory] = useState<string>("Todos");
  const visible =
    category === "Todos" ? allPosts : allPosts.filter((p) => p.category === category);

  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {["Todos", ...postCategories].map((item) => {
          const isActive = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                isActive
                  ? "border-transparent bg-navy-900 text-white shadow-card"
                  : "border-navy-200 bg-white text-navy-700 hover:border-tech-300 hover:text-tech-700",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {featured ? (
        <article className="mt-10 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card transition-shadow hover:shadow-card-hover">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="p-7 sm:p-9 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-2xs font-bold uppercase tracking-[0.12em] text-aqua-700 ring-1 ring-aqua-200">
                  <Icon name="sparkles" className="h-3.5 w-3.5" />
                  {featured.category}
                </span>
                <span className="text-xs text-ink-muted">
                  {formatDate(featured.date)} · leitura de {countReading(featured.blocks)} min
                </span>
              </div>

              <h2 className="mt-5 text-[1.6rem] font-bold leading-tight text-navy-900 sm:text-[2rem]">
                <Link href={`/blog/${featured.slug}`} className="hover:text-tech-700">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-[1.02rem] leading-7 text-ink-soft">{featured.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-tech-600 to-aqua-500 text-xs font-bold text-white">
                  <Icon name={featured.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{featured.author}</p>
                  <p className="text-xs text-ink-muted">{featured.role}</p>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-tech-700 hover:text-tech-800"
                >
                  Ler o artigo
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative hidden h-full min-h-[16rem] lg:col-span-4 lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,#152a54_0%,#0a1f44_55%,#050d1f_100%)]" />
              <div className="absolute inset-0 bg-grid-dark bg-grid opacity-50" />
              <Icon
                name={featured.icon}
                className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-aqua-400/70"
              />
            </div>
          </div>
        </article>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="card-base card-hover flex h-full flex-col"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-tech-50 px-3 py-1 text-2xs font-bold uppercase tracking-[0.12em] text-tech-700">
                {post.category}
              </span>
              <span className="text-2xs text-ink-muted">{formatDate(post.date)}</span>
            </div>

            <h3 className="mt-4 text-[1.15rem] font-bold leading-snug text-navy-900">
              <Link href={`/blog/${post.slug}`} className="hover:text-tech-700">
                {post.title}
              </Link>
            </h3>

            <p className="mt-2.5 flex-1 text-[0.92rem] leading-6 text-ink-soft">
              {post.excerpt}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
              <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
                <Icon name="clock" className="h-4 w-4" />
                {countReading(post.blocks)} min de leitura
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-tech-700 hover:text-tech-800"
                aria-label={`Ler ${post.title}`}
              >
                Ler <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-surface p-8 text-center text-sm text-ink-muted">
          Ainda não há artigos nesta categoria. Volte em breve ou fale com a gente sobre o
          assunto que você quer entender.
        </p>
      ) : null}
    </div>
  );
}

function countReading(blocks: { t: string; v: unknown }[]): number {
  const text = blocks
    .map((b) => (Array.isArray(b.v) ? b.v.join(" ") : String(b.v ?? "")))
    .join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}
