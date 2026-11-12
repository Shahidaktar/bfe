import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@prisma/client';
import { ArrowRight, Clock3 } from 'lucide-react';
import { estimateReadingTime, formatBlogDate } from '../lib/blog';

const HERO_IMAGE = '/destinations/europe-hero.jpg';
const FALLBACK_IMAGE = '/destinations/italy-hero.jpg';

interface BlogsPageProps {
  posts: BlogPost[];
}

const PostMeta: React.FC<{ post: BlogPost; className?: string }> = ({ post, className = '' }) => (
  <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b68b55] ${className}`}>
    <span>{post.category}</span>
    <span className="h-3 w-px bg-stone-300" aria-hidden="true" />
    <span className="text-stone-400">{formatBlogDate(post.publishedAt ?? post.createdAt)}</span>
    {/* <span className="h-3 w-px bg-stone-300" aria-hidden="true" /> */}
    {/* <span className="inline-flex items-center gap-1.5 text-stone-400">
      <Clock3 className="h-3 w-3" />
      {estimateReadingTime(post.content)} min read
    </span> */}
  </div>
);

export const BlogsPage: React.FC<BlogsPageProps> = ({ posts }) => {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#05131f] pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg`}
            alt=""
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/70 to-[#04101b]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c59b67] sm:text-[11px]">
                The Journal
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Stories from <span className="italic text-[#e8c697]">the road.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-light leading-[1.9] text-stone-200 sm:text-base">
              Field notes, destination guides and slower ways to see the world — written
              by the people who plan our journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[#c59b67]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center sm:py-20">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c59b67]">
                Coming soon
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-[#081726] sm:text-4xl">
                Our first stories are being written.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-stone-500">
                In the meantime, tell us where you would like to go and we will start
                sketching the journey.
              </p>
              <Link
                href="/enquiry"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#081726] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0c2238]"
              >
                <span>Plan your journey</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                      <img
                        src={post.coverImage || FALLBACK_IMAGE}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <PostMeta post={post} />
                      <h2 className="mt-3.5 font-serif text-2xl leading-snug tracking-tight text-[#081726] transition-colors group-hover:text-[#b68b55]">
                        {post.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-stone-500">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6a35]">
                        Read the story
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#081726] p-7 text-white sm:flex-row sm:items-center sm:p-10">
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c59b67]">
                    Your own story
                  </p>
                  <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
                    Ready to write the <span className="italic text-[#e8c697]">next chapter?</span>
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};
