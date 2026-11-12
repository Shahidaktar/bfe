import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';
import { auth } from '../../../../../lib/auth';
import { isAdminSession } from '../../../../../lib/admin';
import { prisma } from '../../../../../lib/prisma';
import { BlogForm } from '../../../../../components/admin/BlogForm';
import type { BlogPostStatus } from '../../../../../lib/blog';

export const instant = false;

export const metadata: Metadata = {
  title: 'Edit Blog Post - Beyond Admin',
  robots: { index: false, follow: false },
};

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const session = await auth();
  if (!isAdminSession(session)) redirect('/admin/login');

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <BlogForm
      postId={post.id}
      initial={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? '',
        category: post.category,
        author: post.author,
        status: (post.status === 'published' ? 'published' : 'draft') as BlogPostStatus,
      }}
    />
  );
}
