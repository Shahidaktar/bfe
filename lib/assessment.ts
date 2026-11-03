export const STEP_SIZE = 9;

export type QuestionType = 'text' | 'radio' | 'checkbox';

export interface WizardQuestion {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

export interface SubmissionAnswer {
  questionId: string;
  title: string;
  type: string;
  answer: string | string[];
}

/** Admin payload parsing shared by the question create/update routes. */
export const normalizeQuestion = (input: unknown) => {
  const data = input as Record<string, unknown>;
  const type = typeof data.type === 'string' ? data.type : '';
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const required = Boolean(data.required);
  const rawOptions = Array.isArray(data.options) ? data.options : [];
  const options = rawOptions
    .filter((o): o is string => typeof o === 'string')
    .map((o) => o.trim())
    .filter(Boolean)
    .filter((o, i, arr) => arr.indexOf(o) === i);

  if (!new Set(['text', 'radio', 'checkbox']).has(type)) {
    return { error: 'Invalid question type.' } as const;
  }
  if (!title) {
    return { error: 'Question text is required.' } as const;
  }
  if (type !== 'text' && options.length < 2) {
    return { error: 'Choice questions need at least two options.' } as const;
  }

  return {
    data: { type: type as QuestionType, title, required, options: type === 'text' ? [] : options },
  } as const;
};

/** Split questions/answers into steps of at most `size` items. */
export const chunkSteps = <T>(items: T[], size: number = STEP_SIZE): T[][] => {
  const steps: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    steps.push(items.slice(i, i + size));
  }
  return steps;
};
