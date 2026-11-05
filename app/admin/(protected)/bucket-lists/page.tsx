import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { ChevronLeft, ChevronRight, Compass, Eye } from 'lucide-react';
import { prisma } from '../../../../lib/prisma';
import { formatBucketDate } from '../../../../lib/bucketList';

export const instant = false;

export const metadata: Metadata = {
  title: 'Bucket Lists - Beyond Admin',
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 5;

const formatDate = (value: Date) =>
  value.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const pageHref = (page: number) => `/admin/bucket-lists?page=${page}`;

export default async function AdminBucketListsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await connection();
  const { page: pageParam } = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  const total = await prisma.bucketList.count();
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);

  const bucketLists = await prisma.bucketList.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { user: { select: { name: true, email: true } } },
  });

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(total, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1">
            Wishlists
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#081726] font-normal tracking-tight">
            Bucket Lists
          </h1>
        </div>
        <p className="text-sm text-stone-500">
          {total} {total === 1 ? 'bucket list' : 'bucket lists'}
        </p>
      </div>

      {bucketLists.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-10 sm:p-14 text-center">
          <Compass className="w-10 h-10 text-[#c59b67] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-serif text-2xl text-[#081726] mb-2">No bucket lists yet</h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            When a signed-in traveller saves a bucket list, it will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#faf8f5]">
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">#</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Saved</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Traveller</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Destination</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Dates</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Days</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bucketLists.map((item, index) => (
                    <tr key={item.id} className="border-b border-stone-100 last:border-0 hover:bg-[#c59b67]/5 transition-colors">
                      <td className="px-5 py-4 text-stone-500 tabular-nums">{start + index}</td>
                      <td className="px-5 py-4 text-stone-600 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                      <td className="px-5 py-4">
                        <span className="block text-[#081726] font-medium">{item.user.name ?? '—'}</span>
                        <span className="block text-xs text-stone-500 break-all">{item.user.email ?? ''}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="block text-[#081726]">{item.destination}</span>
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#b68b55]">{item.category}</span>
                      </td>
                      <td className="px-5 py-4 text-stone-600 whitespace-nowrap">
                        {formatBucketDate(item.startDate)} – {formatBucketDate(item.endDate)}
                      </td>
                      <td className="px-5 py-4 text-stone-600">{item.days}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/bucket-lists/${item.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#c59b67] text-[#8a6a35] hover:bg-[#c59b67] hover:text-[#081726] text-[11px] font-semibold tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </Link>
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
              Showing <span className="font-semibold text-[#081726]">{start}-{end}</span> of{' '}
              <span className="font-semibold text-[#081726]">{total}</span>
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-1.5">
              {page > 1 ? (
                <Link
                  href={pageHref(page - 1)}
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
                    href={pageHref(n)}
                    aria-label={`Page ${n}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 text-stone-600 hover:border-[#c59b67] hover:text-[#8a6a35] text-xs font-semibold transition-colors"
                  >
                    {n}
                  </Link>
                )
              )}

              {page < totalPages ? (
                <Link
                  href={pageHref(page + 1)}
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
