import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { auth } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';
import { formatBucketDate, formatBucketPrice, formatBucketStatus } from '../../../../lib/bucketList';

export const instant = false;

export const metadata: Metadata = {
  title: 'Bucket List - My Account',
  robots: { index: false, follow: false },
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
    <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold mb-1">
      {label}
    </dt>
    <dd className="text-sm sm:text-[15px] text-[#081726] leading-relaxed break-words">{children}</dd>
  </div>
);

export default async function BucketListDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/create-the-bucketlist');
  }

  const { id } = await params;
  const bucketList = await prisma.bucketList.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!bucketList) notFound();

  return (
    <div className="bg-[#FBFAF7] pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#081726] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Bucket Lists</span>
        </Link>

        <div className="mt-5 rounded-2xl bg-[#081726] text-white px-6 sm:px-9 py-7 sm:py-9">
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-2">
            {bucketList.category}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.08]">
                {bucketList.destination}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-300">
                <MapPin className="w-4 h-4 text-[#c59b67] shrink-0" />
                {bucketList.location}
              </p>
            </div>
            <span className="inline-flex self-start sm:self-auto items-center rounded-full border border-[#c59b67]/40 bg-[#c59b67]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#e8c697]">
              {formatBucketStatus(bucketList.status)}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-5 items-start">
          <div className="space-y-5">
            <section className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-7 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-4 pb-4 border-b border-[#c59b67]/30">
                The Journey
              </h2>
              <p className="text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light">
                {bucketList.description}
              </p>

              <dl className="mt-6 space-y-4">
                <Field label="Dates">
                  {formatBucketDate(bucketList.startDate)} – {formatBucketDate(bucketList.endDate)}
                </Field>
                <Field label="Duration">
                  {bucketList.days} days · {bucketList.days - 1} nights
                </Field>
                <Field label="Indicative From">
                  {formatBucketPrice(bucketList.price)} per person
                </Field>
              </dl>
            </section>

            <section className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-7 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-4 pb-4 border-b border-[#c59b67]/30">
                Your Note
              </h2>
              {bucketList.message ? (
                <div className="flex gap-3">
                  <MessageSquare className="w-4 h-4 mt-1 shrink-0 text-[#c59b67]" />
                  <p className="text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light whitespace-pre-line">
                    {bucketList.message}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-stone-400 font-light">
                  No special requests were added to this bucket list.
                </p>
              )}
            </section>
          </div>

          <aside className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-7 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#c59b67]" />
            <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">
              What happens next
            </p>
            <ul className="mt-4 space-y-3.5 text-[13px] text-stone-600 font-light leading-relaxed">
              {[
                'Our travel designers review your saved journey.',
                'We reach out to understand your pace and preferences.',
                'A tailored itinerary and quote follows.',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#c59b67]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-stone-100 space-y-3 text-sm text-[#081726]">
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#c59b67]" />
                {formatBucketDate(bucketList.startDate)}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c59b67]" />
                {bucketList.days} days
              </p>
              <p className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#c59b67]" />
                {formatBucketPrice(bucketList.price)}
              </p>
            </div>

            <Link
              href="/create-the-bucketlist"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#081726] px-5 py-3 text-[11px] font-bold tracking-[0.18em] uppercase text-[#e8c697] hover:text-[#f3e2c0] hover:border-[#c59b67]/50 border border-[#081726] transition-colors"
            >
              <span>Add Another Journey</span>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
