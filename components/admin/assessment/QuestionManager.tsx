'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Loader2,
  ClipboardList,
} from 'lucide-react';
import type { WizardQuestion, QuestionType } from '../../../lib/assessment';

interface QuestionManagerProps {
  initialQuestions: WizardQuestion[];
}

const TYPE_LABEL: Record<QuestionType, string> = {
  text: 'Text Input',
  radio: 'Single Choice',
  checkbox: 'Multiple Choice',
};

const TYPE_BADGE: Record<QuestionType, string> = {
  text: 'bg-stone-100 text-stone-600',
  radio: 'bg-[#c59b67]/15 text-[#8a6a35]',
  checkbox: 'bg-[#081726]/5 text-[#081726]',
};

const emptyForm = {
  title: '',
  type: 'radio' as QuestionType,
  required: true,
  options: ['', ''],
};

export const QuestionManager: React.FC<QuestionManagerProps> = ({ initialQuestions }) => {
  const router = useRouter();
  const [list, setList] = useState(initialQuestions);
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setList(initialQuestions);
  }, [initialQuestions]);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId('new');
    setError('');
  };

  const openEdit = (question: WizardQuestion) => {
    setForm({
      title: question.title,
      type: question.type,
      required: question.required,
      options: question.type === 'text' ? [] : question.options.length >= 2 ? [...question.options] : ['', ''],
    });
    setEditingId(question.id);
    setError('');
  };

  const closeForm = () => {
    setEditingId(null);
    setError('');
  };

  const setOption = (index: number, value: string) =>
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((o, i) => (i === index ? value : o)),
    }));

  const addOption = () =>
    setForm((prev) => ({ ...prev, options: [...prev.options, ''] }));

  const removeOption = (index: number) =>
    setForm((prev) => ({ ...prev, options: prev.options.filter((_, i) => i !== index) }));

  const handleTypeChange = (type: QuestionType) =>
    setForm((prev) => ({
      ...prev,
      type,
      options: type === 'text' ? [] : prev.options.length >= 2 ? prev.options : ['', ''],
    }));

  const save = async () => {
    const payload = {
      title: form.title.trim(),
      type: form.type,
      required: form.required,
      options: form.type === 'text' ? [] : form.options.map((o) => o.trim()).filter(Boolean),
    };

    if (!payload.title) {
      setError('Question text is required.');
      return;
    }
    if (payload.type !== 'text' && payload.options.length < 2) {
      setError('Choice questions need at least two non-empty options.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const isNew = editingId === 'new';
      const url = isNew
        ? '/api/admin/assessment/questions'
        : `/api/admin/assessment/questions/${editingId}`;
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not save the question.');
      }
      closeForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the question.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (question: WizardQuestion) => {
    if (!window.confirm(`Delete “${question.title}”? This cannot be undone.`)) return;
    setDeletingId(question.id);
    try {
      const res = await fetch(`/api/admin/assessment/questions/${question.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Could not delete the question.');
      }
      router.refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Could not delete the question.');
    } finally {
      setDeletingId(null);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;

    const next = [...list];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setList(next);
    setMovingId(item.id);
    try {
      const res = await fetch('/api/admin/assessment/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: next.map((q) => q.id) }),
      });
      if (!res.ok) throw new Error('Reorder failed.');
      router.refresh();
    } catch {
      router.refresh();
    } finally {
      setMovingId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Question list */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-stone-200 bg-[#faf8f5]">
          <p className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            Question Order
          </p>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>

        {list.length === 0 ? (
          <div className="p-10 text-center">
            <ClipboardList className="w-8 h-8 text-[#c59b67] mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm text-stone-500">No questions yet. Add your first one.</p>
          </div>
        ) : (
          <ol className="divide-y divide-stone-100">
            {list.map((q, index) => (
              <li key={q.id} className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4">
                <span className="font-mono text-sm text-[#c59b67] tabular-nums pt-1 w-6 shrink-0">
                  {index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-[15px] text-[#081726] font-medium leading-snug">
                    {q.title}
                    {q.required && <span className="text-[#b68b55]"> *</span>}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px]">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${TYPE_BADGE[q.type]}`}>
                      {TYPE_LABEL[q.type]}
                    </span>
                    {q.required && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold uppercase tracking-wide">
                        Required
                      </span>
                    )}
                    {q.options.length > 0 && (
                      <span className="text-stone-500">
                        {q.options.length} options
                      </span>
                    )}
                  </div>
                  {q.options.length > 0 && (
                    <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
                      {q.options.slice(0, 4).join(' · ')}
                      {q.options.length > 4 ? ` · +${q.options.length - 4} more` : ''}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label="Move question up"
                    disabled={index === 0 || movingId === q.id}
                    onClick={() => move(index, -1)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-[#081726] hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move question down"
                    disabled={index === list.length - 1 || movingId === q.id}
                    onClick={() => move(index, 1)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-[#081726] hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit question"
                    onClick={() => openEdit(q)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-[#8a6a35] hover:bg-[#c59b67]/10 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete question"
                    onClick={() => remove(q)}
                    disabled={deletingId === q.id}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {deletingId === q.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Add / edit form */}
      {editingId && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-xl sm:text-2xl text-[#081726] font-normal">
              {editingId === 'new' ? 'Add Question' : 'Edit Question'}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              aria-label="Close"
              className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label htmlFor="question-title" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Question *
            </label>
            <input
              id="question-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. What is your travel style?"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="question-type" className="block text-xs font-semibold text-stone-700 mb-1.5">
                Question Type
              </label>
              <select
                id="question-type"
                value={form.type}
                onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#c59b67] transition-colors"
              >
                <option value="radio">Single Choice (Radio)</option>
                <option value="checkbox">Multiple Choice (Checkboxes)</option>
                <option value="text">Text Input</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="inline-flex items-center gap-2.5 text-sm text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.required}
                  onChange={(e) => setForm((p) => ({ ...p, required: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[#c59b67] cursor-pointer"
                />
                <span>Required question</span>
              </label>
            </div>
          </div>

          {form.type !== 'text' && (
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1.5">Options *</p>
              <div className="space-y-2">
                {form.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => setOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      aria-label={`Option ${index + 1}`}
                      className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      disabled={form.options.length <= 2}
                      aria-label="Remove option"
                      className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addOption}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a6a35] hover:text-[#081726] uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Option
              </button>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#081726] hover:bg-[#0c2238] disabled:opacity-60 disabled:cursor-wait text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{editingId === 'new' ? 'Add Question' : 'Save Changes'}</span>
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
