import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../lib/auth';
import { isAdminSession } from '../../../../../lib/admin';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAdminSession(session)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await prisma.planMyJourneySubmission.deleteMany({ where: { id } });
    if (result.count === 0) {
      return Response.json({ error: 'Submission not found.' }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Failed to delete submission:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not delete the submission.' }, { status: 500 });
  }
}
