import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../lib/auth';
import { isAdminSession } from '../../../../../lib/admin';

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

  const ids = (body as Record<string, unknown>).ids;
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string')) {
    return Response.json({ error: 'Expected { ids: string[] }.' }, { status: 400 });
  }

  const existing = await prisma.assessmentQuestion.findMany({ select: { id: true } });
  const existingIds = new Set(existing.map((q) => q.id));

  if (ids.length !== existing.length || ids.some((id) => !existingIds.has(id as string))) {
    return Response.json({ error: 'Question list mismatch.' }, { status: 400 });
  }

  await prisma.$transaction(
    (ids as string[]).map((id, index) =>
      prisma.assessmentQuestion.update({ where: { id }, data: { order: index } })
    )
  );

  return Response.json({ ok: true });
}
