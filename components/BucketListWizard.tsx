'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  MessageSquare,
  Sparkles,
  Wallet,
} from 'lucide-react';
import {
  BUCKET_CATEGORIES,
  BUCKET_LIST_DAYS,
  BUCKET_LIST_PRICE,
  addDaysToDateString,
  findBucketCategory,
  findBucketDestination,
  formatBucketDate,
  formatBucketPrice,
  toDateString,
} from '../lib/bucketList';

interface BucketListWizardProps {
  userName?: string;
}

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ['Destination', 'Details', 'Timeline', 'Review'];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const BucketListWizard: React.FC<BucketListWizardProps> = ({ userName }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState<Step>(1);
  const [categoryId, setCategoryId] = useState(BUCKET_CATEGORIES[0].id);
  const [destinationId, setDestinationId] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [monthCursor, setMonthCursor] = useState<Date | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const now = new Date();
    setToday(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    setMonthCursor(startOfMonth(now));
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const category = useMemo(() => findBucketCategory(categoryId) ?? BUCKET_CATEGORIES[0], [categoryId]);
  const selected = useMemo(
    () => (destinationId ? findBucketDestination(destinationId) : null),
    [destinationId]
  );
  const endDate = startDate ? addDaysToDateString(startDate, BUCKET_LIST_DAYS - 1) : null;

  const chooseCategory = (id: string) => {
    setCategoryId(id);
    setDestinationId('');
    setError('');
  };

  const next = () => {
    if (step === 1 && !destinationId) {
      setError('Please choose an experience to continue.');
      return;
    }
    if (step === 3 && !startDate) {
      setError('Please choose a start date.');
      return;
    }
    setError('');
    setStep((current) => (current < 4 ? ((current + 1) as Step) : current));
  };

  const back = () => {
    setError('');
    setStep((current) => (current > 1 ? ((current - 1) as Step) : current));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!destinationId || !startDate) {
      setError('Please complete your destination and timeline first.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/bucket-lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationId, startDate, message }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not save your bucket list. Please try again.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save your bucket list.');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setStep(1);
    setCategoryId(BUCKET_CATEGORIES[0].id);
    setDestinationId('');
    setStartDate(null);
    setMessage('');
    setError('');
    const now = new Date();
    setMonthCursor(startOfMonth(now));
  };

  const changeMonth = (direction: number) => {
    setMonthCursor((current) => {
      if (!current) return current;
      return new Date(current.getFullYear(), current.getMonth() + direction, 1);
    });
  };

  const canGoPrev =
    !!monthCursor &&
    !!today &&
    (monthCursor.getFullYear() > today.getFullYear() ||
      (monthCursor.getFullYear() === today.getFullYear() &&
        monthCursor.getMonth() > today.getMonth()));

  if (submitted) {
    return (
      <div
        ref={cardRef}
        className="max-w-7xl mx-auto rounded-2xl border border-stone-200/80 bg-white shadow-[0_24px_60px_-40px_rgba(8,23,38,0.4)] px-6 sm:px-10 py-12 sm:py-16 text-center"
      >
        <div className="w-14 h-14 rounded-full border border-[#c59b67] bg-[#c59b67]/10 flex items-center justify-center mx-auto">
          <Check className="w-6 h-6 text-[#b68b55] stroke-[2.25]" />
        </div>
        <h3 className="mt-6 font-serif text-3xl sm:text-4xl text-[#081726] tracking-tight">
          Your bucket list is saved.
        </h3>
        <p className="mt-4 text-sm text-stone-500 leading-relaxed font-light max-w-md mx-auto">
          {selected ? `${selected.destination.name} is now waiting in your account.` : 'Your journey is now waiting in your account.'} Our
          travel designers will review it and reach out with a tailored plan.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] text-[#241a08] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-[0_6px_16px_-6px_rgba(197,155,103,0.55)]"
          >
            <span>View My Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-stone-300 text-[#081726] hover:border-[#c59b67] hover:text-[#b68b55] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase transition-colors cursor-pointer"
          >
            <span>Create Another</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="max-w-7xl mx-auto rounded-2xl border border-stone-200/80 bg-white shadow-[0_24px_60px_-40px_rgba(8,23,38,0.4)] overflow-hidden scroll-mt-24"
    >
      <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-stone-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
              Travel Wishlist
            </span>
            <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#081726] tracking-tight">
              {userName ? `${userName}’s bucket list` : 'Build your bucket list'}
            </h3>
          </div>
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-stone-400 tabular-nums">
            0{step} / 04
          </span>
        </div>

        <div className="mt-5 h-1 w-full rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#c59b67] transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="mt-4 hidden sm:flex items-center justify-between gap-2">
          {STEP_LABELS.map((label, index) => {
            const number = index + 1;
            const active = number === step;
            const complete = number < step;
            return (
              <span
                key={label}
                className={`flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-semibold ${
                  active ? 'text-[#081726]' : complete ? 'text-[#b68b55]' : 'text-stone-400'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border ${
                    active
                      ? 'bg-[#081726] border-[#081726] text-white'
                      : complete
                        ? 'bg-[#c59b67]/15 border-[#c59b67]/40 text-[#b68b55]'
                        : 'border-stone-200 text-stone-400'
                  }`}
                >
                  {complete ? <Check className="w-3 h-3" /> : number}
                </span>
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="px-5 sm:px-8 py-6 sm:py-8 min-h-[360px]">
        {step === 1 && (
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight">
              Choose your destination
            </h4>
            <p className="mt-2 text-sm text-stone-500 font-light leading-relaxed">
              Begin with a category, then choose the experience you have been dreaming about.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BUCKET_CATEGORIES.map((item) => {
                const active = item.id === categoryId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseCategory(item.id)}
                    aria-pressed={active}
                    className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      active
                        ? 'border-[#c59b67] bg-[#c59b67]/10 shadow-[0_8px_24px_-18px_rgba(197,155,103,0.8)]'
                        : 'border-stone-200 bg-white hover:border-[#c59b67]/50'
                    }`}
                  >
                    <span>
                      <span className="block text-xs sm:text-[13px] font-semibold text-[#081726] leading-snug">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-stone-400">
                        {item.destinations.length} experiences
                      </span>
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        active ? 'border-[#c59b67] bg-[#c59b67] text-white' : 'border-stone-300'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3 px-1">
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c59b67]">
                  {category.name}
                </p>
                <p className="text-[10px] text-stone-400 hidden sm:block">{category.tagline}</p>
              </div>

              <div className="mt-3 max-h-[330px] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.destinations.map((destination, index) => {
                  const active = destination.id === destinationId;
                  return (
                    <button
                      key={destination.id}
                      type="button"
                      onClick={() => {
                        setDestinationId(destination.id);
                        setError('');
                      }}
                      aria-pressed={active}
                      className={`group relative flex gap-3 rounded-lg border p-3 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#c59b67] bg-white shadow-[0_10px_28px_-24px_rgba(8,23,38,0.55)]'
                          : 'border-stone-200/80 bg-white/70 hover:border-[#c59b67]/50 hover:bg-white'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold border ${
                          active
                            ? 'bg-[#081726] border-[#081726] text-white'
                            : 'border-stone-200 text-stone-400 bg-[#FAF8F5]'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-[15px] sm:text-base text-[#081726] leading-snug">
                          {destination.name}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#b68b55]">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {destination.location}
                        </span>
                        <span className="mt-1.5 block text-xs text-stone-500 leading-relaxed font-light line-clamp-2">
                          {destination.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 2 && selected && (
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight">
              A closer look
            </h4>
            <p className="mt-2 text-sm text-stone-500 font-light leading-relaxed">
              Every journey is ten days, privately designed and paced around you.
            </p>

            <div className="mt-6 grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-5">
              <div className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-5 sm:p-6">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c59b67]">
                  {selected.category.name}
                </span>
                <h5 className="mt-3 font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight leading-tight">
                  {selected.destination.name}
                </h5>
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#b68b55]">
                  <MapPin className="w-3.5 h-3.5" />
                  {selected.destination.location}
                </p>
                <p className="mt-4 text-sm text-stone-600 leading-[1.85] font-light">
                  {selected.destination.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <Clock className="w-4 h-4 text-[#c59b67]" />
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-stone-400">
                      Duration
                    </p>
                    <p className="mt-0.5 font-serif text-lg text-[#081726]">
                      {BUCKET_LIST_DAYS} days
                    </p>
                    <p className="text-[11px] text-stone-400">{BUCKET_LIST_DAYS - 1} nights</p>
                  </div>
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <Wallet className="w-4 h-4 text-[#c59b67]" />
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-stone-400">
                      Indicative from
                    </p>
                    <p className="mt-0.5 font-serif text-lg text-[#081726]">
                      {formatBucketPrice(BUCKET_LIST_PRICE)}
                    </p>
                    <p className="text-[11px] text-stone-400">per person</p>
                  </div>
                </div>
              </div>

              <aside className="rounded-xl bg-[#081726] text-white p-5 sm:p-6">
                <Sparkles className="w-4 h-4 text-[#c59b67]" />
                <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[#c59b67] font-semibold">
                  Included in the idea
                </p>
                <ul className="mt-4 space-y-3 text-[13px] text-stone-300 font-light leading-relaxed">
                  {[
                    'Private transfers and hand-picked stays',
                    'A dedicated travel designer',
                    'Curated experiences at an easy pace',
                    'Flexible dates and room preferences',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#c59b67]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-4 border-t border-white/10 text-[11px] text-stone-400 leading-relaxed">
                  Final pricing is tailored to your dates, season and preferred style of travel.
                </p>
              </aside>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight">
              Choose your ten days
            </h4>
            <p className="mt-2 text-sm text-stone-500 font-light leading-relaxed">
              Select a start date. We will reserve ten days from that day onward.
            </p>

            <div className="mt-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] gap-5">
              <div className="rounded-xl border border-stone-200/80 bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    disabled={!canGoPrev}
                    aria-label="Previous month"
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-[#c59b67] hover:text-[#b68b55] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <p className="font-serif text-lg text-[#081726]">
                    {monthCursor
                      ? monthCursor.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
                      : ''}
                  </p>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label="Next month"
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-[#c59b67] hover:text-[#b68b55] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className="h-7 flex items-center justify-center text-[10px] uppercase tracking-wider text-stone-400 font-semibold"
                    >
                      {day}
                    </span>
                  ))}
                  {monthCursor &&
                    today &&
                    Array.from({ length: new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1).getDay() }).map((_, index) => (
                      <span key={`blank-${index}`} className="h-9" />
                    ))}
                  {monthCursor &&
                    today &&
                    Array.from({
                      length: new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0).getDate(),
                    }).map((_, index) => {
                      const dayNumber = index + 1;
                      const day = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), dayNumber);
                      const value = toDateString(day);
                      const todayValue = toDateString(today);
                      const disabled = value < todayValue;
                      const isStart = value === startDate;
                      const isEnd = value === endDate;
                      const inRange = !!startDate && !!endDate && value >= startDate && value <= endDate;
                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            setStartDate(value);
                            setError('');
                          }}
                          aria-pressed={isStart}
                          className={`h-9 rounded-lg text-xs tabular-nums transition-colors ${
                            isStart || isEnd
                              ? 'bg-[#c59b67] text-[#081726] font-semibold'
                              : inRange
                                ? 'bg-[#c59b67]/15 text-[#081726]'
                                : disabled
                                  ? 'text-stone-300 cursor-not-allowed'
                                  : 'text-stone-600 hover:bg-[#c59b67]/10 hover:text-[#081726] cursor-pointer'
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-5 sm:p-6">
                <CalendarDays className="w-4 h-4 text-[#c59b67]" />
                <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">
                  Your dates
                </p>
                {startDate && endDate ? (
                  <>
                    <p className="mt-2 font-serif text-xl text-[#081726] leading-snug">
                      {formatBucketDate(startDate)}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 my-1">
                      to
                    </p>
                    <p className="font-serif text-xl text-[#081726] leading-snug">
                      {formatBucketDate(endDate)}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c59b67]/30 bg-white px-3 py-1.5 text-[11px] text-[#8a6a35]">
                      <Clock className="w-3.5 h-3.5" />
                      {BUCKET_LIST_DAYS} days · {BUCKET_LIST_DAYS - 1} nights
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-stone-500 leading-relaxed font-light">
                    Choose a start date on the calendar and your ten-day window will appear here.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && selected && startDate && endDate && (
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight">
              The finishing touch
            </h4>
            <p className="mt-2 text-sm text-stone-500 font-light leading-relaxed">
              Add anything you would like us to know, then send your bucket list to our designers.
            </p>

            <div className="mt-6 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-5">
              <div>
                <label htmlFor="bucket-list-message" className="block text-[10px] tracking-[0.18em] uppercase text-stone-500 font-semibold mb-2">
                  Any query or special request
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-stone-400" />
                  <textarea
                    id="bucket-list-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={6}
                    placeholder="Celebrating an anniversary, travelling with family, a room with a view, a slower pace…"
                    className="w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 py-4 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#081726] transition-colors resize-none"
                  />
                </div>
                <p className="mt-2 text-[11px] text-stone-400">
                  Optional — a sentence is enough.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-5 sm:p-6">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c59b67]">
                  Your bucket list
                </span>
                <h5 className="mt-2 font-serif text-xl text-[#081726] tracking-tight leading-snug">
                  {selected.destination.name}
                </h5>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#b68b55]">
                  {selected.destination.location}
                </p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-stone-400 text-xs uppercase tracking-[0.14em]">Dates</dt>
                    <dd className="text-right text-[#081726]">
                      {formatBucketDate(startDate)} – {formatBucketDate(endDate)}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-stone-400 text-xs uppercase tracking-[0.14em]">Duration</dt>
                    <dd className="text-[#081726]">{BUCKET_LIST_DAYS} days</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-stone-400 text-xs uppercase tracking-[0.14em]">From</dt>
                    <dd className="text-[#081726]">{formatBucketPrice(BUCKET_LIST_PRICE)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-5 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="px-5 sm:px-8 py-5 border-t border-stone-100 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            disabled={saving}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-stone-500 hover:text-[#081726] disabled:opacity-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <span />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#081726] hover:text-[#b68b55] transition-colors cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            onClick={submit}
            disabled={saving}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#081726] hover:text-[#b68b55] disabled:opacity-50 disabled:cursor-wait transition-colors cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{saving ? 'Saving' : 'Submit'}</span>
            {!saving && <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
