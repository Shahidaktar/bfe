import { prisma } from '../../../../../../lib/prisma';
import { auth } from '../../../../../../lib/auth';
import { isAdminSession } from '../../../../../../lib/admin';
import { normalizeQuestion } from '../../../../../../lib/assessment';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  try {
    const result = await prisma.assessmentQuestion.updateMany({
      where: { id },
      data: parsed.data,
    });
    if (result.count === 0) {
      return Response.json({ error: 'Question not found.' }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Failed to update question:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not update the question.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAdminSession(session)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { id } = await params;

  const deleted = await prisma.assessmentQuestion.deleteMany({ where: { id } });
  if (deleted.count === 0) {
    return Response.json({ error: 'Question not found.' }, { status: 404 });
  }

  // Re-sequence so order stays 0..n-1.
  const remaining = await prisma.assessmentQuestion.findMany({
    orderBy: { order: 'asc' },
    select: { id: true },
  });
  await prisma.$transaction(
    remaining.map((q, index) =>
      prisma.assessmentQuestion.update({ where: { id: q.id }, data: { order: index } })
    )
  );

  return Response.json({ ok: true });
}
