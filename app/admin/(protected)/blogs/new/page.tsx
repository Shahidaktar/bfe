import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { auth } from '../../../../../lib/auth';
import { isAdminSession } from '../../../../../lib/admin';
import { BlogForm } from '../../../../../components/admin/BlogForm';

export const instant = false;

export const metadata: Metadata = {
  title: 'New Blog Post - Beyond Admin',
  robots: { index: false, follow: false },
};

export default async function NewBlogPostPage() {
  await connection();
  const session = await auth();
  if (!isAdminSession(session)) redirect('/admin/login');

  return (
    <BlogForm
      initial={{
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        category: 'Journal',
        author: 'Beyond Forever Earth',
        status: 'draft',
      }}
    />
  );
}
