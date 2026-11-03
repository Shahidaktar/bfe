import type { Metadata } from 'next';
import { connection } from 'next/server';
import { prisma } from '../../lib/prisma';
import { chunkSteps, type WizardQuestion, type QuestionType } from '../../lib/assessment';
import { AssessmentWizard } from '../../components/assessment/AssessmentWizard';

export const instant = false;


export const metadata: Metadata = {
  title: 'Travel Assessment - Beyond Forever Earth',
  description:
    'Answer a few curated questions about your travel style, budget and dream experiences. A dedicated travel specialist will design your private journey.',
};

export default async function TravelAssessmentPage() {
  await connection();
  const questions = await prisma.assessmentQuestion.findMany({
    orderBy: { order: 'asc' },
  });

  const wizardQuestions: WizardQuestion[] = questions.map((q) => ({
    id: q.id,
    title: q.title,
    type: (['text', 'radio', 'checkbox'].includes(q.type) ? q.type : 'text') as QuestionType,
    required: q.required,
    options: Array.isArray(q.options)
      ? q.options.filter((o): o is string => typeof o === 'string')
      : [],
  }));

  const steps = chunkSteps(wizardQuestions);
  const wizardSteps = steps.length > 0 ? steps : [[]];

  return (
    <div className="bg-[#faf8f5]">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#05131f] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/frames/ezgif-frame-075.jpg"
            alt="A sweeping view over a coastline at golden hour"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/75 to-[#04101b]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c59b67]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
              Bespoke Journey Design
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] max-w-3xl">
            Travel <span className="italic text-[#e8c697]">Assessment</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base font-sans text-stone-200 font-light leading-relaxed">
            A short, private assessment about your travel style, budget and dream
            experiences. Your answers help our specialists design a journey that is
            unmistakably yours — no obligations.
          </p>
        </div>
      </section>

      {/* Assessment form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="p-0">
            {/* <div className="text-center mb-8 sm:mb-10">
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#c59b67] uppercase font-semibold block mb-3 font-sans">
                Private Travel Assessment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#081726] font-normal tracking-tight leading-[1.12] mb-3">
                Help Us <span className="italic text-[#c59b67]">Understand You</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                Each step shows nine curated questions. The last few minutes are just about
                you — your name, phone and email so a specialist can reach out.
              </p>
            </div> */}

            <AssessmentWizard steps={wizardSteps} />
          </div>
        </div>
      </section>
    </div>
  );
}
