'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Eye,
  Loader2,
  Save,
  Image as ImageIcon,
} from 'lucide-react';
import {
  BLOG_CATEGORIES,
  estimateReadingTime,
  excerptFromContent,
  slugify,
  type BlogPostStatus,
} from '../../lib/blog';
import { DeleteBlogButton } from './DeleteBlogButton';

export interface BlogFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  status: BlogPostStatus;
}

interface BlogFormProps {
  postId?: string;
  initial: BlogFormValues;
}

const inputClass =
  'w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] focus:ring-2 focus:ring-[#c59b67]/15 transition-colors';

export const BlogForm: React.FC<BlogFormProps> = ({ postId, initial }) => {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormValues>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(postId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const readingTime = useMemo(() => estimateReadingTime(form.content), [form.content]);

  const onTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const save = async () => {
    if (!form.title.trim()) {
      setError('A title is required.');
      return;
    }
    if (!form.content.trim()) {
      setError('Post content is required.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const res = await fetch(postId ? `/api/admin/blogs/${postId}` : '/api/admin/blogs', {
        method: postId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not save the post.');
      }
      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the post.');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] text-stone-500 hover:text-[#8a6a35] uppercase font-semibold mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Manage Blogs
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#081726] font-normal tracking-tight">
            {postId ? 'Edit Post' : 'New Post'}
          </h1>
          <p className="mt-2 text-sm text-stone-500 leading-relaxed">
            {postId
              ? 'Update the story, imagery or publishing status.'
              : 'Write a new story for the public journal.'}
          </p>
        </div>

        {postId && form.status === 'published' && (
          <Link
            href={`/blogs/${form.slug || slugify(form.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#c59b67] text-[#8a6a35] hover:bg-[#c59b67] hover:text-[#081726] text-[11px] font-semibold tracking-wider uppercase transition-colors shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span>View Post</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
        {/* Main editorial fields */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 space-y-5">
          <div>
            <label htmlFor="post-title" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Title *
            </label>
            <input
              id="post-title"
              type="text"
              value={form.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. A Slow Morning in the Tuscan Hills"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="post-slug" className="block text-xs font-semibold text-stone-700 mb-1.5">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 shrink-0">/blogs/</span>
              <input
                id="post-slug"
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', e.target.value);
                }}
                placeholder="a-slow-morning-in-tuscany"
                className={inputClass}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-stone-400">
              Generated from the title. Edit only if you need a specific URL.
            </p>
          </div>

          <div>
            <label htmlFor="post-excerpt" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Excerpt
            </label>
            <textarea
              id="post-excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="A short summary for the blog listing. Leave empty to generate one from the content."
              className={`${inputClass} resize-y`}
            />
            {!form.excerpt.trim() && form.content.trim() && (
              <button
                type="button"
                onClick={() => set('excerpt', excerptFromContent(form.content))}
                className="mt-2 text-[11px] font-semibold tracking-wider uppercase text-[#8a6a35] hover:text-[#081726] transition-colors cursor-pointer"
              >
                Generate from content
              </button>
            )}
          </div>

          <div>
            <div className="flex items-end justify-between gap-3 mb-1.5">
              <label htmlFor="post-content" className="block text-xs font-semibold text-stone-700">
                Content *
              </label>
              <span className="text-[11px] text-stone-400">
                {readingTime} min read · {form.content.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              id="post-content"
              rows={20}
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              placeholder={'Write your story here…\n\n## A section heading\n\nA new paragraph begins after a blank line.\n\n- A bullet point\n- Another point\n\n> A pull quote.'}
              className={`${inputClass} resize-y font-mono text-[13px] leading-relaxed`}
            />
            <p className="mt-2 text-[11px] text-stone-400 leading-relaxed">
              Blank line starts a new paragraph. Use <code className="text-stone-600">##</code> for a heading,
              <code className="text-stone-600"> - </code> for bullets, <code className="text-stone-600">1.</code> for
              numbered lists and <code className="text-stone-600">&gt;</code> for a pull quote.
            </p>
          </div>
        </div>

        {/* Publishing sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
            <h2 className="font-serif text-xl text-[#081726]">Publishing</h2>

            <div>
              <label htmlFor="post-status" className="block text-xs font-semibold text-stone-700 mb-1.5">
                Status
              </label>
              <select
                id="post-status"
                value={form.status}
                onChange={(e) => set('status', e.target.value as BlogPostStatus)}
                className={inputClass}
              >
                <option value="draft">Draft — hidden from the site</option>
                <option value="published">Published — visible to everyone</option>
              </select>
            </div>

            <div>
              <label htmlFor="post-category" className="block text-xs font-semibold text-stone-700 mb-1.5">
                Category
              </label>
              <input
                id="post-category"
                type="text"
                list="blog-categories"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                placeholder="Journal"
                className={inputClass}
              />
              <datalist id="blog-categories">
                {BLOG_CATEGORIES.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="post-author" className="block text-xs font-semibold text-stone-700 mb-1.5">
                Author
              </label>
              <input
                id="post-author"
                type="text"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                placeholder="Beyond Forever Earth"
                className={inputClass}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
            <h2 className="font-serif text-xl text-[#081726]">Cover Image</h2>

            <div>
              <label htmlFor="post-cover" className="block text-xs font-semibold text-stone-700 mb-1.5">
                Image URL
              </label>
              <input
                id="post-cover"
                type="url"
                value={form.coverImage}
                onChange={(e) => set('coverImage', e.target.value)}
                placeholder="https://… or /destinations/italy-hero.jpg"
                className={inputClass}
              />
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
              {form.coverImage ? (
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center px-4">
                  <ImageIcon className="w-7 h-7 text-stone-300 mx-auto mb-1.5" />
                  <p className="text-[11px] text-stone-400">Cover preview</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#081726] hover:bg-[#0c2238] disabled:opacity-60 disabled:cursor-wait text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{postId ? 'Save Changes' : 'Create Post'}</span>
            </button>
            <Link
              href="/admin/blogs"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              Cancel
            </Link>
          </div>

          {postId && (
            <div className="pt-2 border-t border-stone-200">
              <DeleteBlogButton id={postId} title={form.title} variant="button" redirectToList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
