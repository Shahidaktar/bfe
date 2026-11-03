'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react';
import type { WizardQuestion } from '../../lib/assessment';

interface AssessmentWizardProps {
  steps: WizardQuestion[][];
}

const inputClass =
  'w-full bg-transparent border-0 border-b border-stone-300 rounded-none px-0 py-3 text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] transition-colors';
const labelClass = 'block text-sm sm:text-base font-semibold text-stone-900 mb-1.5';
const errorClass = 'mt-1.5 text-xs sm:text-sm text-red-600';

const optionRowClass =
  'flex items-center gap-4 px-2 sm:px-3 py-4 last:border-0 hover:bg-[#c59b67]/5 has-checked:bg-[#c59b67]/5 has-checked:text-stone-900 cursor-pointer transition-colors text-stone-600';

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ steps }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [contact, setContact] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLFormElement>(null);

  const totalSteps = steps.length;
  const isFinal = step === totalSteps - 1;
  const currentQuestions = steps[step] ?? [];
  const offset = steps.slice(0, step).reduce((sum, chunk) => sum + chunk.length, 0);
  const progress = ((step + 1) / totalSteps) * 100;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const setAnswer = (id: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const toggleCheckbox = (id: string, option: string) =>
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [id]: next };
    });

  const validateStep = () => {
    const next: Record<string, string> = {};
    for (const q of currentQuestions) {
      if (!q.required) continue;
      const value = answers[q.id];
      const empty =
        q.type === 'checkbox'
          ? !Array.isArray(value) || value.length === 0
          : !String(value ?? '').trim();
      if (empty) next[q.id] = 'This question is required.';
    }
    if (isFinal) {
      if (!contact.firstName.trim()) next.firstName = 'First name is required.';
      if (!contact.lastName.trim()) next.lastName = 'Last name is required.';
      if (!contact.phone.trim()) next.phone = 'Phone number is required.';
      if (!contact.email.trim()) {
        next.email = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
        next.email = 'Please enter a valid email address.';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSaving(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          answers: steps.flat().map((q) => ({
            questionId: q.id,
            title: q.title,
            type: q.type,
            answer: answers[q.id] ?? (q.type === 'checkbox' ? [] : ''),
          })),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not save your assessment. Please try again.');
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Could not save your assessment. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#c59b67]/15 text-[#c59b67] flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
          Thank You — Your Assessment Is With Us
        </h2>
        <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed">
          Thank you{contact.firstName ? `, ${contact.firstName}` : ''}. Your travel assessment
          has been received. A dedicated travel specialist will reach out within one business
          day with personalised recommendations.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-all"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <form
      ref={topRef}
      onSubmit={handleSubmit}
      className="space-y-7 scroll-mt-24"
      id="travel-assessment-form"
    >
      {/* Progress */}
      <div className="pt-2">
        <div className="flex items-center justify-between gap-4 mb-2.5">
          <p className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-stone-500 font-semibold">
            Step <span className="text-[#b68b55]">{step + 1}</span> / {totalSteps}
          </p>
          <p className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-stone-400">
            {Math.round(progress)}% Complete
          </p>
        </div>
        <div className="h-px bg-stone-300">
          <div
            className="h-[3px] -mt-[1px] bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        key={step}
        className="animate-in fade-in slide-in-from-right-1 duration-300 divide-y divide-stone-200"
      >
        {currentQuestions.map((q, index) => (
          <div
            key={q.id}
            className="py-7 flex flex-col gap-4"
          >
            <label htmlFor={`question-${q.id}`} className="flex items-start gap-5 sm:gap-7">
              <span className="font-serif italic text-2xl sm:text-3xl text-[#c59b67]/90 font-light leading-none w-10 sm:w-12 shrink-0 select-none">
                {String(offset + index + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-xl sm:text-2xl text-stone-900 tracking-tight leading-snug">
                {q.title}
                {q.required && <span className="text-[#b68b55]"> *</span>}
              </span>
            </label>

            <div className="pl-14 sm:pl-[4.75rem]">
              {q.type === 'text' && (
                <input
                  id={`question-${q.id}`}
                  type="text"
                  value={String(answers[q.id] ?? '')}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder="Type your answer…"
                  className={inputClass}
                />
              )}

              {q.type === 'radio' && (
                <div>
                  {q.options.map((option) => (
                    <label key={option} className={optionRowClass}>
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === option}
                        onChange={() => setAnswer(q.id, option)}
                        className="w-4 h-4 shrink-0 accent-[#c59b67] cursor-pointer"
                      />
                      <span className="text-sm sm:text-base leading-snug">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'checkbox' && (
                <div>
                  {q.options.map((option) => (
                    <label key={option} className={optionRowClass}>
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(answers[q.id]) &&
                          (answers[q.id] as string[]).includes(option)
                        }
                        onChange={() => toggleCheckbox(q.id, option)}
                        className="w-4 h-4 shrink-0 rounded accent-[#c59b67] cursor-pointer"
                      />
                      <span className="text-sm sm:text-base leading-snug">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {errors[q.id] && <p className={errorClass}>{errors[q.id]}</p>}
            </div>
          </div>
        ))}

        {isFinal && (
          <div className=" pt-6 mt-2">
            <p className="text-[11px] tracking-[0.22em] text-[#c59b67] uppercase font-semibold mb-4 font-sans">
              Almost Done — Your Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="assessment-first-name" className={labelClass}>
                  First Name *
                </label>
                <input
                  id="assessment-first-name"
                  type="text"
                  required
                  value={contact.firstName}
                  onChange={(e) => setContact((p) => ({ ...p, firstName: e.target.value }))}
                  placeholder="First name"
                  className={inputClass}
                />
                {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="assessment-last-name" className={labelClass}>
                  Last Name *
                </label>
                <input
                  id="assessment-last-name"
                  type="text"
                  required
                  value={contact.lastName}
                  onChange={(e) => setContact((p) => ({ ...p, lastName: e.target.value }))}
                  placeholder="Last name"
                  className={inputClass}
                />
                {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
              </div>
              <div>
                <label htmlFor="assessment-phone" className={labelClass}>
                  Phone Number *
                </label>
                <input
                  id="assessment-phone"
                  type="tel"
                  required
                  value={contact.phone}
                  onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 98923 44001"
                  className={inputClass}
                />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="assessment-email" className={labelClass}>
                  Email Address *
                </label>
                <input
                  id="assessment-email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>
              {submitError && (
                <p role="alert" className="sm:col-span-2 text-sm sm:text-base text-red-600">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className={`pt-2 border-0 ${isFinal ? '' : 'border-t'} border-stone-200 flex items-center justify-between gap-3`}>
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <span />
        )}

        {!isFinal ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#081726] hover:bg-[#0c2238] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#c59b67] hover:bg-[#b68b55] disabled:opacity-60 disabled:cursor-wait text-[#081726] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-all shadow-md cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{saving ? 'Submitting…' : 'Submit Assessment'}</span>
          </button>
        )}
      </div>
    </form>
  );
};
