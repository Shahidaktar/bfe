import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../lib/auth';
import { isAdminSession } from '../../../../../lib/admin';
import { normalizeBlogInput, uniqueBlogSlug } from '../../../../../lib/blog-input';

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

  const parsed = normalizeBlogInput(body);
  if ('error' in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const { id } = await params;
  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { id: true, publishedAt: true },
  });
  if (!existing) {
    return Response.json({ error: 'Post not found.' }, { status: 404 });
  }

  try {
    const slug = await uniqueBlogSlug(parsed.data.slug, id);
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...parsed.data,
        slug,
        publishedAt:
          parsed.data.status === 'published'
            ? existing.publishedAt ?? new Date()
            : null,
      },
    });
    return Response.json({ ok: true, id: post.id, slug: post.slug });
  } catch (error) {
    console.error('Failed to update blog post:', (error as Error)?.message ?? error);
    return Response.json({ error: 'Could not update the post.' }, { status: 500 });
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
  const deleted = await prisma.blogPost.deleteMany({ where: { id } });
  if (deleted.count === 0) {
    return Response.json({ error: 'Post not found.' }, { status: 404 });
  }

  return Response.json({ ok: true });
}
