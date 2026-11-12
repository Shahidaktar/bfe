import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@prisma/client';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { estimateReadingTime, formatBlogDate } from '../lib/blog';
import { BlogContent } from './BlogContent';

const FALLBACK_IMAGE = '/destinations/italy-hero.jpg';

interface BlogPostPageProps {
  post: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  const cover = post.coverImage || FALLBACK_IMAGE;

  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#05131f] pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/75 to-[#04101b]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-300 transition-colors hover:text-[#e8c697]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              The Journal
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c59b67]">
              <span>{post.category}</span>
              <span className="h-3 w-px bg-white/25" aria-hidden="true" />
              <span className="text-stone-300">{formatBlogDate(post.publishedAt ?? post.createdAt)}</span>
              <span className="h-3 w-px bg-white/25" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-stone-300">
                <Clock3 className="h-3 w-3" />
                {estimateReadingTime(post.content)} min read
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-2xl text-sm font-light leading-[1.9] text-stone-200 sm:text-base">
              {post.excerpt}
            </p>

            <p className="mt-7 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
              Words by {post.author}
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[#c59b67]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <article>
            <BlogContent content={post.content} />
          </article>

          <div className="mt-14 border-t border-stone-200 pt-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b68b55]">
              Written by
            </p>
            <p className="mt-2 font-serif text-2xl text-[#081726]">{post.author}</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-stone-500">
              Part of the Beyond Forever Earth editorial team, designing private journeys
              around the world.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-[#081726] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c59b67]">
                Inspired by this story?
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
                Let us plan <span className="italic text-[#e8c697]">your journey.</span>
              </h2>
            </div>
            <Link
              href="/enquiry"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#c59b67] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] transition-colors hover:bg-[#d6aa75]"
            >
              <span>Start planning</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6a35] transition-colors hover:text-[#081726]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
