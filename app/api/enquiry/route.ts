import { prisma } from '../../../lib/prisma';


const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const fullName = asString(data.fullName);
  const email = asString(data.email);
  const destination = asString(data.destination);

  if (!fullName || !email || !destination) {
    return Response.json(
      { error: 'Full name, email address and destination are required.' },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const optional = (key: string) => asString(data[key]) || null;

  try {
    const submission = await prisma.planMyJourneySubmission.create({
      data: {
        fullName,
        phone: optional('phone'),
        email,
        destination,
        citiesToCover: optional('citiesToCover'),
        departureCity: optional('departureCity'),
        arrivalCity: optional('arrivalCity'),
        departureDate: optional('departureDate'),
        returnDate: optional('returnDate'),
        travellers: optional('travellers'),
        hotelBreakfast: optional('hotelBreakfast'),
        sightseeing: optional('sightseeing'),
        visa: optional('visa'),
        transport: optional('transport'),
        roomView: optional('roomView'),
        bedding: optional('bedding'),
        experiences: asStringArray(data.experiences),
        otherServices: asStringArray(data.otherServices),
        travelInsurance: optional('travelInsurance'),
        saveDetails: Boolean(data.saveDetails),
      },
      select: { id: true },
    });

    return Response.json({ ok: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to save enquiry:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not save your enquiry. Please try again.' }, { status: 500 });
  }
}
