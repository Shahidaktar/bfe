import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { ClipboardList, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { prisma } from '../../../../lib/prisma';
import { DeleteQuoteButton } from '../../../../components/admin/DeleteQuoteButton';

export const instant = false;


export const metadata: Metadata = {
  title: 'Travel Quotes - Beyond Admin',
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 5;

const formatDate = (value: Date) =>
  value.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const pageHref = (page: number) => `/admin/travel-quotes?page=${page}`;

export default async function TravelQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await connection();
  const { page: pageParam } = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  const total = await prisma.planMyJourneySubmission.count();
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);

  const quotes = await prisma.planMyJourneySubmission.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(total, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1">
            Submissions
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#081726] font-normal tracking-tight">
            Travel Quotes
          </h1>
        </div>
        <p className="text-sm text-stone-500">
          {total} {total === 1 ? 'submission' : 'submissions'}
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-10 sm:p-14 text-center">
          <ClipboardList className="w-10 h-10 text-[#c59b67] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-serif text-2xl text-[#081726] mb-2">No submissions yet</h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            When someone completes the enquiry form, their enquiry will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#faf8f5]">
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">#</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Submitted</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Name</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Email</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Destination</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">Who</th>
                    <th className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote, index) => (
                    <tr key={quote.id} className="border-b border-stone-100 last:border-0 hover:bg-[#c59b67]/5 transition-colors">
                      <td className="px-5 py-4 text-stone-500 tabular-nums">{start + index}</td>
                      <td className="px-5 py-4 text-stone-600 whitespace-nowrap">{formatDate(quote.createdAt)}</td>
                      <td className="px-5 py-4 text-[#081726] font-medium">{quote.fullName}</td>
                      <td className="px-5 py-4 text-stone-600 break-all">{quote.email}</td>
                      <td className="px-5 py-4 text-stone-700">{quote.destination}</td>
                      <td className="px-5 py-4 text-stone-600">{quote.travellers ?? '—'}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/travel-quotes/${quote.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#c59b67] text-[#8a6a35] hover:bg-[#c59b67] hover:text-[#081726] text-[11px] font-semibold tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </Link>
                          <DeleteQuoteButton id={quote.id} fullName={quote.fullName} variant="icon" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
            <p className="text-xs sm:text-sm text-stone-500">
              Showing <span className="font-semibold text-[#081726]">{start}–{end}</span> of{' '}
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
