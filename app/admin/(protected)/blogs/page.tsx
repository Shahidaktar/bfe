import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { auth } from '../../../../lib/auth';
import { isAdminSession } from '../../../../lib/admin';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
} from 'lucide-react';
import { prisma } from '../../../../lib/prisma';
import { estimateReadingTime, formatBlogDate } from '../../../../lib/blog';
import { DeleteBlogButton } from '../../../../components/admin/DeleteBlogButton';

export const instant = false;

export const metadata: Metadata = {
  title: 'Manage Blogs - Beyond Admin',
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 10;

type StatusFilter = 'all' | 'published' | 'draft';

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
];

const filterHref = (status: StatusFilter) =>
  status === 'all' ? '/admin/blogs' : `/admin/blogs?status=${status}`;

const pageHref = (page: number, status: StatusFilter) => {
  const params = new URLSearchParams();
  if (status !== 'all') params.set('status', status);
  params.set('page', String(page));
  return `/admin/blogs?${params.toString()}`;
};

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  await connection();
  const session = await auth();
  if (!isAdminSession(session)) redirect('/admin/login');

  const { page: pageParam, status: statusParam } = await searchParams;
  const status: StatusFilter =
    statusParam === 'published' || statusParam === 'draft' ? statusParam : 'all';
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  const where = status === 'all' ? {} : { status };

  const total = await prisma.blogPost.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(total, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1">
            Editorial
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#081726] font-normal tracking-tight">
            Manage Blogs
          </h1>
          <p className="mt-2 text-sm text-stone-500 max-w-2xl leading-relaxed">
            Write stories, set cover imagery and publish them to the public journal.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {statusFilters.map((filter) => {
          const active = status === filter.value;
          return (
            <Link
              key={filter.value}
              href={filterHref(filter.value)}
              aria-current={active ? 'page' : undefined}
              className={`px-4 py-2 rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                active
                  ? 'bg-[#081726] text-white'
                  : 'bg-white border border-stone-200 text-stone-500 hover:border-[#c59b67] hover:text-[#8a6a35]'
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
        <span className="ml-auto text-xs sm:text-sm text-stone-500">
          {total} {total === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-10 sm:p-14 text-center">
          <FileText className="w-10 h-10 text-[#c59b67] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-serif text-2xl text-[#081726] mb-2">
            {status === 'all' ? 'No posts yet' : status === 'published' ? 'Nothing published yet' : 'No drafts yet'}
          </h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed mb-5">
            {status === 'all'
              ? 'Create your first journal entry and publish it when you are ready.'
              : 'Posts will appear here once they match this filter.'}
          </p>
          {status === 'all' && (
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#081726] hover:bg-[#0c2238] text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Post</span>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#faf8f5]">
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Post</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Category</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Status</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Published</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Updated</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-stone-100 last:border-0 hover:bg-[#c59b67]/5 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                            {post.coverImage ? (
                              <img
                                src={post.coverImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-4 h-4 text-stone-300" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[#081726] font-medium leading-snug line-clamp-1">
                              {post.title}
                            </p>
                            <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                              /blogs/{post.slug} · {estimateReadingTime(post.content)} min read
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-stone-600 whitespace-nowrap">{post.category}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                            post.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-stone-600 whitespace-nowrap">
                        {post.publishedAt ? formatBlogDate(post.publishedAt) : '—'}
                      </td>
                      <td className="px-5 py-4 text-stone-600 whitespace-nowrap">
                        {formatBlogDate(post.updatedAt)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {post.status === 'published' && (
                            <Link
                              href={`/blogs/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${post.title}`}
                              title="View post"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 text-stone-500 hover:text-[#8a6a35] hover:border-[#c59b67] transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/blogs/${post.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#c59b67] text-[#8a6a35] hover:bg-[#c59b67] hover:text-[#081726] text-[11px] font-semibold tracking-wider uppercase transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                          <DeleteBlogButton id={post.id} title={post.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
            <p className="text-xs sm:text-sm text-stone-500">
              Showing <span className="font-semibold text-[#081726]">{start}–{end}</span> of{' '}
              <span className="font-semibold text-[#081726]">{total}</span>
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-1.5">
              {page > 1 ? (
                <Link
                  href={pageHref(page - 1, status)}
                  aria-label="Previous page"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 text-stone-600 hover:border-[#c59b67] hover:text-[#8a6a35] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <span aria-disabled="true" aria-label="Previous page" className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-100 text-stone-300 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </span>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
                n === page ? (
                  <span
                    key={n}
                    aria-current="page"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#c59b67] text-[#081726] text-xs font-semibold"
                  >
                    {n}
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={pageHref(n, status)}
                    aria-label={`Page ${n}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 text-stone-600 hover:border-[#c59b67] hover:text-[#8a6a35] text-xs font-semibold transition-colors"
                  >
                    {n}
                  </Link>
                )
              )}

              {page < totalPages ? (
                <Link
                  href={pageHref(page + 1, status)}
                  aria-label="Next page"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 text-stone-600 hover:border-[#c59b67] hover:text-[#8a6a35] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span aria-disabled="true" aria-label="Next page" className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-100 text-stone-300 cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
