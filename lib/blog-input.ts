import { prisma } from './prisma';
import { excerptFromContent, slugify, type BlogPostStatus } from './blog';

type UnknownRecord = Record<string, unknown>;

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const isSafeImage = (value: string): boolean =>
  value.startsWith('/') || /^https?:\/\//i.test(value);

export const normalizeBlogInput = (body: unknown) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Invalid request body.' as const };
  }

  const input = body as UnknownRecord;
  const title = asString(input.title);
  const content = typeof input.content === 'string' ? input.content.trim() : '';
  const rawSlug = asString(input.slug);
  const rawExcerpt = asString(input.excerpt);
  const rawCover = asString(input.coverImage);
  const category = asString(input.category) || 'Journal';
  const author = asString(input.author) || 'Beyond Forever Earth';
  const status: BlogPostStatus = input.status === 'published' ? 'published' : 'draft';

  if (!title) return { error: 'A title is required.' as const };
  if (!content) return { error: 'Post content is required.' as const };
  if (rawCover && !isSafeImage(rawCover)) {
    return { error: 'Cover image must be a full URL or a path starting with /.' as const };
  }

  const slug = slugify(rawSlug || title);
  if (!slug) return { error: 'Could not create a slug from this title.' as const };

  return {
    data: {
      title,
      slug,
      excerpt: rawExcerpt || excerptFromContent(content),
      content,
      coverImage: rawCover || null,
      category: category.slice(0, 80),
      author: author.slice(0, 120),
      status,
    },
  };
};

export const uniqueBlogSlug = async (
  base: string,
  excludeId?: string
): Promise<string> => {
  let candidate = base;
  let suffix = 2;

  while (true) {
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
};
