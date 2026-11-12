'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteBlogButtonProps {
  id: string;
  title: string;
  variant?: 'icon' | 'button';
  redirectToList?: boolean;
}

export const DeleteBlogButton: React.FC<DeleteBlogButtonProps> = ({
  id,
  title,
  variant = 'icon',
  redirectToList = false,
}) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) {
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not delete the post.');
      }
      if (redirectToList) {
        router.push('/admin/blogs');
      }
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Could not delete the post.');
      setDeleting(false);
    }
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-60 disabled:cursor-wait text-[11px] font-semibold tracking-wider uppercase transition-colors cursor-pointer"
      >
        {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        <span>{deleting ? 'Deleting…' : 'Delete Post'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={deleting}
      aria-label={`Delete ${title}`}
      title="Delete"
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 text-stone-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 disabled:opacity-60 disabled:cursor-wait transition-colors cursor-pointer"
    >
      {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
};
