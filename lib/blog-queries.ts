import { cache } from 'react';
import { prisma } from './prisma';

export const getPublishedBlogPosts = cache(async () =>
  prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  })
);

export const getPublishedBlogPostBySlug = cache(async (slug: string) =>
  prisma.blogPost.findFirst({
    where: { slug, status: 'published' },
  })
);
