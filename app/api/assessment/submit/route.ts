import { prisma } from '../../../../lib/prisma';

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const asAnswers = (value: unknown) => {
  if (!Array.isArray(value)) return null;
  const answers = [];
  for (const item of value) {
    const record = item as Record<string, unknown>;
    answers.push({
      questionId: asString(record.questionId),
      title: asString(record.title),
      type: asString(record.type),
      answer: record.answer ?? '',
    });
  }
  return answers;
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const firstName = asString(data.firstName);
  const lastName = asString(data.lastName);
  const phone = asString(data.phone);
  const email = asString(data.email);

  if (!firstName || !lastName || !phone || !email) {
    return Response.json(
      { error: 'First name, last name, phone and email are required.' },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const answers = asAnswers(data.answers);
  if (!answers) {
    return Response.json({ error: 'Invalid answers payload.' }, { status: 400 });
  }

  try {
    const submission = await prisma.assessmentSubmission.create({
      data: { firstName, lastName, phone, email, answers },
      select: { id: true },
    });
    return Response.json({ ok: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to save assessment submission:', (error as Error)?.message ?? error);
    return Response.json(
      { error: 'Could not save your assessment. Please try again.' },
      { status: 500 }
    );
  }
}
