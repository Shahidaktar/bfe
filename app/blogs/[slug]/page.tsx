import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { BlogPostPage } from '../../../components/BlogPostPage';
import { getPublishedBlogPostBySlug } from '../../../lib/blog-queries';

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Story not found - Beyond Forever Earth',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} - Beyond Forever Earth`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) notFound();

  return <BlogPostPage post={post} />;
}
