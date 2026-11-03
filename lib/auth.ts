import { timingSafeEqual } from 'crypto';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './prisma';

const safeEqual = (a: string, b: string) => {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  return aBuf.length === bBuf.length && timingSafeEqual(aBuf, bBuf);
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Google,
    Credentials({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) return null;

        const email = String(credentials?.email ?? '').trim().toLowerCase();
        const password = String(credentials?.password ?? '');
        if (!email || !password) return null;

        if (safeEqual(email, adminEmail.toLowerCase()) && safeEqual(password, adminPassword)) {
          return { id: 'admin', name: 'Administrator', email: adminEmail };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
