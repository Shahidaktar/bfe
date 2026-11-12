'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ClipboardList,
  ClipboardPen,
  Compass,
  Newspaper,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

type NavItem =
  | { href: string; label: string; icon: LucideIcon }
  | { label: string; icon: LucideIcon; children: { href: string; label: string }[] };

const ITEMS: NavItem[] = [
  { href: '/admin/travel-quotes', label: 'Travel Quotes', icon: ClipboardList },
  { href: '/admin/bucket-lists', label: 'Bucket Lists', icon: Compass },
  { href: '/admin/blogs', label: 'Manage Blogs', icon: Newspaper },
  {
    label: 'Travel Assessment',
    icon: ClipboardPen,
    children: [
      { href: '/admin/travel-assessment/survey-form', label: 'Survey Form' },
      { href: '/admin/travel-assessment/submissions', label: 'Submissions' },
    ],
  },
];

const isActiveHref = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [assessmentOpen, setAssessmentOpen] = useState(
    pathname.startsWith('/admin/travel-assessment')
  );

  // Flat list for small screens.
  const flatLinks = ITEMS.flatMap((item) =>
    'children' in item
      ? item.children.map((child) => ({ ...child, icon: item.icon }))
      : [item]
  );

  const linkClass = (active: boolean) =>
    `group flex items-center gap-3 px-3 sm:px-4 min-h-[44px] lg:min-h-[52px] rounded-lg text-[11px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors shrink-0 ${
      active
        ? 'bg-[#c59b67]/15 text-[#e8c697]'
        : 'text-stone-400 hover:text-white hover:bg-white/5'
    }`;

  const iconClass = (active: boolean) =>
    `w-4 h-4 shrink-0 transition-colors ${
      active ? 'text-[#c59b67]' : 'text-stone-500 group-hover:text-[#e8c697]'
    }`;

  return (
    <>
      {/* Mobile / small screens: flat scrollable tabs */}
      <nav aria-label="Admin sections" className="flex lg:hidden items-center gap-1 px-3 sm:px-4 overflow-x-auto">
        {flatLinks.map((link) => {
          const Icon = link.icon;
          const active = isActiveHref(pathname, link.href);
          return (
            <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined} className={linkClass(active)}>
              <Icon className={iconClass(active)} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop: grouped vertical navigation */}
      <nav aria-label="Admin sections" className="hidden lg:flex flex-col gap-1 px-3">
        {ITEMS.map((item) => {
          if ('children' in item) {
            const groupActive = pathname.startsWith('/admin/travel-assessment');
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setAssessmentOpen((open) => !open)}
                  aria-expanded={assessmentOpen}
                  className={linkClass(groupActive)}
                >
                  <Icon className={iconClass(groupActive)} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-stone-500 transition-transform duration-200 ${
                      assessmentOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {assessmentOpen && (
                  <div className="mt-1 ml-8 pl-4 border-l border-white/10 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const active = isActiveHref(pathname, child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center gap-2.5 h-11 px-3 rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                            active
                              ? 'bg-[#c59b67]/15 text-[#e8c697]'
                              : 'text-stone-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[#c59b67]' : 'bg-stone-600'}`} />
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const Icon = item.icon;
          const active = isActiveHref(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`${linkClass(active)} lg:min-h-[52px]`}
            >
              <Icon className={iconClass(active)} />
              <span className="flex-1 text-left">{item.label}</span>
              {active && <span className="w-1 h-5 rounded-full bg-[#c59b67]" aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
    </>
  );
};
