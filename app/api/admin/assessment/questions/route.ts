import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../lib/auth';
import { isAdminSession } from '../../../../../lib/admin';
import { normalizeQuestion } from '../../../../../lib/assessment';

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdminSession(session)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = normalizeQuestion(body);
  if ('error' in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const count = await prisma.assessmentQuestion.count();

  try {
    const question = await prisma.assessmentQuestion.create({
      data: {
        ...parsed.data,
        order: count,
      },
    });
    return Response.json({ ok: true, id: question.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create question:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not save the question.' }, { status: 500 });
  }
}
