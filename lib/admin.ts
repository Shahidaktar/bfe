import type { Session } from 'next-auth';

/** Server-side check: is this session the configured admin (email/password)? */
export function isAdminSession(session: Session | null): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !session?.user?.email) return false;
  return session.user.email.toLowerCase() === adminEmail.toLowerCase();
}
