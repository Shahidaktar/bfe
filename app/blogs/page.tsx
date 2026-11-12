import type { Metadata } from 'next';
import { connection } from 'next/server';
import { BlogsPage } from '../../components/BlogsPage';
import { getPublishedBlogPosts } from '../../lib/blog-queries';

export const instant = false;

export const metadata: Metadata = {
  title: 'The Journal - Beyond Forever Earth',
  description:
    'Field notes, destination guides and travel inspiration from the people who plan our private journeys.',
  openGraph: {
    title: 'The Journal — Beyond Forever Earth',
    description:
      'Field notes, destination guides and travel inspiration from the people who plan our private journeys.',
  },
};

export default async function BlogsRoute() {
  await connection();
  const posts = await getPublishedBlogPosts();

  return <BlogsPage posts={posts} />;
}
