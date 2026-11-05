import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { CalendarDays, ChevronLeft, Clock, Mail, MapPin, MessageSquare, Wallet } from 'lucide-react';
import { prisma } from '../../../../../lib/prisma';
import { formatBucketDate, formatBucketPrice, formatBucketStatus } from '../../../../../lib/bucketList';

export const instant = false;

export const metadata: Metadata = {
  title: 'Bucket List - Beyond Admin',
  robots: { index: false, follow: false },
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
    <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold mb-1">{label}</dt>
    <dd className="text-sm sm:text-[15px] text-[#081726] leading-relaxed break-words">{children}</dd>
  </div>
);

const formatCreatedAt = (d: Date) =>
  d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default async function AdminBucketListDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const bucketList = await prisma.bucketList.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } },
  });
  if (!bucketList) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/bucket-lists"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#081726] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Bucket Lists</span>
      </Link>

      <div className="bg-[#081726] rounded-2xl px-6 sm:px-8 py-6 sm:py-7 text-white flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div className="min-w-0">
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1.5">
            {bucketList.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight leading-[1.1] break-words">
            {bucketList.destination}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-400">
            <MapPin className="w-4 h-4 text-[#c59b67] shrink-0" />
            {bucketList.location}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 text-sm text-stone-300">
          <span className="inline-flex items-center rounded-full border border-[#c59b67]/40 bg-[#c59b67]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#e8c697]">
            {formatBucketStatus(bucketList.status)}
          </span>
          <span className="text-xs text-stone-400">Saved {formatCreatedAt(bucketList.createdAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7">
          <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-5 pb-4 border-b border-[#c59b67]/30">
            Traveller
          </h2>
          <dl className="space-y-4">
            <Field label="Name">{bucketList.user.name ?? '—'}</Field>
            <Field label="Email">
              {bucketList.user.email ? (
                <a
                  href={`mailto:${bucketList.user.email}`}
                  className="inline-flex items-center gap-2 text-[#8a6a35] hover:text-[#081726] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#c59b67] shrink-0" />
                  {bucketList.user.email}
                </a>
              ) : (
                '—'
              )}
            </Field>
            <Field label="Saved">{formatCreatedAt(bucketList.createdAt)}</Field>
            <Field label="Last Updated">{formatCreatedAt(bucketList.updatedAt)}</Field>
          </dl>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7">
          <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-5 pb-4 border-b border-[#c59b67]/30">
            Journey
          </h2>
          <dl className="space-y-4">
            <Field label="Category">{bucketList.category}</Field>
            <Field label="Dates">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#c59b67]" />
                {formatBucketDate(bucketList.startDate)} – {formatBucketDate(bucketList.endDate)}
              </span>
            </Field>
            <Field label="Duration">
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c59b67]" />
                {bucketList.days} days · {bucketList.days - 1} nights
              </span>
            </Field>
            <Field label="Indicative Price">
              <span className="inline-flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#c59b67]" />
                {formatBucketPrice(bucketList.price)} per person
              </span>
            </Field>
          </dl>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7 lg:col-span-2">
          <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-5 pb-4 border-b border-[#c59b67]/30">
            Destination
          </h2>
          <p className="text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light">
            {bucketList.description}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7 lg:col-span-2">
          <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-5 pb-4 border-b border-[#c59b67]/30">
            Query / Special Requests
          </h2>
          {bucketList.message ? (
            <div className="flex gap-3">
              <MessageSquare className="w-4 h-4 mt-1 shrink-0 text-[#c59b67]" />
              <p className="text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light whitespace-pre-line">
                {bucketList.message}
              </p>
            </div>
          ) : (
            <p className="text-sm text-stone-400 font-light">No message was included.</p>
          )}
        </section>
      </div>
    </div>
  );
}
