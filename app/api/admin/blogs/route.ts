import { prisma } from '../../../../lib/prisma';
import { auth } from '../../../../lib/auth';
import { isAdminSession } from '../../../../lib/admin';
import { normalizeBlogInput, uniqueBlogSlug } from '../../../../lib/blog-input';

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

  const parsed = normalizeBlogInput(body);
  if ('error' in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const slug = await uniqueBlogSlug(parsed.data.slug);
    const post = await prisma.blogPost.create({
      data: {
        ...parsed.data,
        slug,
        publishedAt: parsed.data.status === 'published' ? new Date() : null,
      },
    });
    return Response.json({ ok: true, id: post.id, slug: post.slug }, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not save the post.' }, { status: 500 });
  }
}
