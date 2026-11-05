import { prisma } from '../../../lib/prisma';
import { auth } from '../../../lib/auth';
import {
  BUCKET_LIST_DAYS,
  BUCKET_LIST_PRICE,
  addDaysToDateString,
  findBucketDestination,
} from '../../../lib/bucketList';

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const bucketLists = await prisma.bucketList.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json({ bucketLists });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Please log in to create a bucket list.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const destinationId = asString(data.destinationId);
  const startDate = asString(data.startDate);
  const message = asString(data.message);

  if (!destinationId) {
    return Response.json({ error: 'Please choose a destination.' }, { status: 400 });
  }

  if (!DATE_PATTERN.test(startDate)) {
    return Response.json({ error: 'Please choose a valid start date.' }, { status: 400 });
  }

  const match = findBucketDestination(destinationId);
  if (!match) {
    return Response.json({ error: 'Destination not found.' }, { status: 404 });
  }

  const endDate = addDaysToDateString(startDate, BUCKET_LIST_DAYS - 1);

  try {
    const bucketList = await prisma.bucketList.create({
      data: {
        userId: session.user.id,
        categoryId: match.category.id,
        category: match.category.name,
        destinationId: match.destination.id,
        destination: match.destination.name,
        location: match.destination.location,
        description: match.destination.description,
        days: BUCKET_LIST_DAYS,
        price: BUCKET_LIST_PRICE,
        startDate,
        endDate,
        message: message || null,
      },
      select: { id: true },
    });

    return Response.json({ ok: true, id: bucketList.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to save bucket list:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not save your bucket list. Please try again.' }, { status: 500 });
  }
}
