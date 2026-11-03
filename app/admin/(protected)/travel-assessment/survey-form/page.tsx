import type { Metadata } from 'next';
import { connection } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { QuestionManager } from '../../../../../components/admin/assessment/QuestionManager';
import type { WizardQuestion, QuestionType } from '../../../../../lib/assessment';

export const metadata: Metadata = {
  title: 'Survey Form - Beyond Admin',
  robots: { index: false, follow: false },
};

export default async function SurveyFormPage() {
  await connection();
  const questions = await prisma.assessmentQuestion.findMany({
    orderBy: { order: 'asc' },
  });

  const parsed: WizardQuestion[] = questions.map((q) => ({
    id: q.id,
    title: q.title,
    type: (['text', 'radio', 'checkbox'].includes(q.type) ? q.type : 'text') as QuestionType,
    required: q.required,
    options: Array.isArray(q.options)
      ? q.options.filter((o): o is string => typeof o === 'string')
      : [],
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1">
            Travel Assessment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#081726] font-normal tracking-tight">
            Survey Form
          </h1>
          <p className="mt-2 text-sm text-stone-500 max-w-2xl leading-relaxed">
            Add, edit, reorder or remove questions. Changes apply immediately — the next
            visitor sees the updated assessment.
          </p>
        </div>
        <p className="text-sm text-stone-500 shrink-0">
          {parsed.length} {parsed.length === 1 ? 'question' : 'questions'}
        </p>
      </div>

      <QuestionManager initialQuestions={parsed} />
    </div>
  );
}
