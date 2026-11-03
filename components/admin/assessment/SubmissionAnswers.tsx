'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { chunkSteps, type SubmissionAnswer } from '../../../lib/assessment';

export const SubmissionAnswers: React.FC<{ answers: SubmissionAnswer[] }> = ({ answers }) => {
  const [step, setStep] = useState(0);
  const steps = chunkSteps(answers);
  const totalSteps = steps.length || 1;
  const isFinal = step === totalSteps - 1;
  const current = steps[step] ?? [];

  if (answers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-sm text-stone-500">
        No answers were recorded for this submission.
      </div>
    );
  }

  const offset = step * 9;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-stone-200">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold">
            Step {step + 1} of {totalSteps}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal mt-0.5">
            Question {offset + 1} – Question {offset + current.length}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            aria-label="Previous step"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:border-[#c59b67] hover:text-[#8a6a35] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
            disabled={isFinal}
            aria-label="Next step"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:border-[#c59b67] hover:text-[#8a6a35] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-2 px-6 pt-5">
        {steps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setStep(index)}
            aria-label={`Go to step ${index + 1}`}
            className={`h-2 rounded-full flex-1 transition-colors ${
              index === step ? 'bg-[#c59b67]' : 'bg-stone-200 hover:bg-stone-300'
            }`}
          />
        ))}
      </div>

      <div key={step} className="animate-in fade-in slide-in-from-right-1 duration-200 grid grid-cols-1 md:grid-cols-2 gap-4 items-start p-6">
        {current.map((item, index) => {
          const answerValues = Array.isArray(item.answer)
            ? item.answer
            : item.answer
              ? [String(item.answer)]
              : [];
          return (
            <div key={`${step}-${index}`} className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#c59b67] tabular-nums pt-0.5 shrink-0">
                  Q{offset + index + 1}.
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-[15px] text-[#081726] font-medium leading-snug">
                    {item.title}
                  </p>
                  {answerValues.length === 0 ? (
                    <p className="mt-2 text-sm text-stone-400 italic">Not answered</p>
                  ) : item.type === 'checkbox' ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {answerValues.map((value) => (
                        <span
                          key={value}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#c59b67]/10 border border-[#c59b67]/30 text-xs text-[#6b5433]"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">{answerValues.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
