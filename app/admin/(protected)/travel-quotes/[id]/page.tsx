import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { ChevronLeft, Mail, Phone } from 'lucide-react';
import { prisma } from '../../../../../lib/prisma';
import { DeleteQuoteButton } from '../../../../../components/admin/DeleteQuoteButton';


export const metadata: Metadata = {
  title: 'Travel Quote - Beyond Admin',
  robots: { index: false, follow: false },
};

const value = (input?: string | null) => (input && input.trim() ? input : '—');
const list = (items: string[]) => (items.length ? items.join(', ') : '—');

const formatDateValue = (input?: string | null) => {
  if (!input) return '—';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
};

const formatCreatedAt = (d: Date) =>
  d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
    <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold mb-1">{label}</dt>
    <dd className="text-sm sm:text-[15px] text-[#081726] leading-relaxed break-words">{children}</dd>
  </div>
);

export default async function TravelQuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const quote = await prisma.planMyJourneySubmission.findUnique({ where: { id } });
  if (!quote) notFound();

  const sections: { title: string; fields: { label: string; content: React.ReactNode }[] }[] = [
    {
      title: 'Traveller Details',
      fields: [
        { label: 'Full Name', content: quote.fullName },
        { label: 'Phone', content: value(quote.phone) },
        { label: 'Email', content: quote.email },
        { label: 'Submitted', content: formatCreatedAt(quote.createdAt) },
      ],
    },
    {
      title: 'Journey',
      fields: [
        { label: 'Destination', content: quote.destination },
        { label: 'Cities to Cover', content: value(quote.citiesToCover) },
        { label: 'Departure City', content: value(quote.departureCity) },
        { label: 'Arrival City', content: value(quote.arrivalCity) },
        { label: 'Departure Date & Time', content: formatDateValue(quote.departureDate) },
        { label: 'Return Date & Time', content: formatDateValue(quote.returnDate) },
      ],
    },
    {
      title: 'Travel Arrangements',
      fields: [
        { label: 'Who will be Travelling', content: value(quote.travellers) },
        { label: 'Hotel with Breakfast', content: value(quote.hotelBreakfast) },
        { label: 'Sightseeing (Entry Tickets)', content: value(quote.sightseeing) },
        { label: 'Visa (Tourist Visa)', content: value(quote.visa) },
        { label: 'Transport (Private Car, SIC)', content: value(quote.transport) },
      ],
    },
    {
      title: 'Other Details',
      fields: [
        { label: 'Preferred Room View', content: value(quote.roomView) },
        { label: 'Preferred Bedding', content: value(quote.bedding) },
        { label: 'Vacation Experience', content: list(quote.experiences) },
        { label: 'Other Services Needed', content: list(quote.otherServices) },
        { label: 'Travel Insurance', content: value(quote.travelInsurance) },
        { label: 'Save Name & Email', content: quote.saveDetails ? 'Yes' : 'No' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/travel-quotes"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#081726] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Travel Quotes</span>
        </Link>
        <DeleteQuoteButton id={quote.id} fullName={quote.fullName} variant="button" redirectToList />
      </div>

      <div className="bg-[#081726] rounded-2xl px-6 sm:px-8 py-6 sm:py-7 text-white flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div className="min-w-0">
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1.5">
            Travel Quote
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight leading-[1.1] break-words">
            {quote.fullName}
          </h1>
          <p className="mt-1.5 text-sm text-stone-400">
            {quote.destination}{' · '}Submitted {formatCreatedAt(quote.createdAt)}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 text-sm text-stone-300">
          <a href={`mailto:${quote.email}`} className="inline-flex items-center gap-2 hover:text-[#e8c697] transition-colors break-all">
            <Mail className="w-4 h-4 text-[#c59b67] shrink-0" />
            <span>{quote.email}</span>
          </a>
          {quote.phone && (
            <a href={`tel:${quote.phone}`} className="inline-flex items-center gap-2 hover:text-[#e8c697] transition-colors">
              <Phone className="w-4 h-4 text-[#c59b67] shrink-0" />
              <span>{quote.phone}</span>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {sections.map((section) => (
          <section key={section.title} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7">
            <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal tracking-tight mb-5 pb-4 border-b border-[#c59b67]/30">
              {section.title}
            </h2>
            <dl className="space-y-4">
              {section.fields.map((field) => (
                <Field key={field.label} label={field.label}>
                  {field.content}
                </Field>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
