import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { ChevronLeft, Mail, Phone } from 'lucide-react';
import { prisma } from '../../../../../../lib/prisma';
import { DeleteSubmissionButton } from '../../../../../../components/admin/assessment/DeleteSubmissionButton';
import { SubmissionAnswers } from '../../../../../../components/admin/assessment/SubmissionAnswers';
import type { SubmissionAnswer } from '../../../../../../lib/assessment';

export const metadata: Metadata = {
  title: 'Assessment Submission - Beyond Admin',
  robots: { index: false, follow: false },
};

const formatCreatedAt = (d: Date) =>
  d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const parseAnswers = (value: unknown): SubmissionAnswer[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = item as Record<string, unknown>;
    return {
      questionId: typeof record.questionId === 'string' ? record.questionId : '',
      title: typeof record.title === 'string' ? record.title : '',
      type: typeof record.type === 'string' ? record.type : 'text',
      answer: Array.isArray(record.answer)
        ? record.answer.filter((a): a is string => typeof a === 'string')
        : typeof record.answer === 'string'
          ? record.answer
          : '',
    };
  });
};

export default async function AssessmentSubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const submission = await prisma.assessmentSubmission.findUnique({ where: { id } });
  if (!submission) notFound();

  const answers = parseAnswers(submission.answers);
  const fullName = `${submission.firstName} ${submission.lastName}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/travel-assessment/submissions"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#081726] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Submissions</span>
        </Link>
        <DeleteSubmissionButton id={submission.id} fullName={fullName} variant="button" redirectToList />
      </div>

      <div className="bg-[#081726] rounded-2xl px-6 sm:px-8 py-6 sm:py-7 text-white flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div className="min-w-0">
          <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold font-sans block mb-1.5">
            Travel Assessment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight leading-[1.1] break-words">
            {fullName}
          </h1>
          <p className="mt-1.5 text-sm text-stone-400">
            Submitted {formatCreatedAt(submission.createdAt)} · {answers.length} answers
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 text-sm text-stone-300">
          <a href={`mailto:${submission.email}`} className="inline-flex items-center gap-2 hover:text-[#e8c697] transition-colors break-all">
            <Mail className="w-4 h-4 text-[#c59b67] shrink-0" />
            <span>{submission.email}</span>
          </a>
          <a href={`tel:${submission.phone}`} className="inline-flex items-center gap-2 hover:text-[#e8c697] transition-colors">
            <Phone className="w-4 h-4 text-[#c59b67] shrink-0" />
            <span>{submission.phone}</span>
          </a>
        </div>
      </div>

      <SubmissionAnswers answers={answers} />
    </div>
  );
}
