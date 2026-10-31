'use client';

import { usePathname, useRouter } from 'next/navigation';

export const PLAN_PATH = '/plan-my-journey';

/** Hook-based navigation: components must call it inside a client component. */
export function useNavigate() {
  const router = useRouter();
  return (path: string) => router.push(path);
}

/** Normalised current path ('/' for the homepage). */
export function useRoute() {
  const pathname = usePathname();
  return pathname.replace(/\/+$/, '') || '/';
}
