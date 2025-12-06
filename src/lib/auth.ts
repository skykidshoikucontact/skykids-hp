import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SESSION_SECRET = process.env.SESSION_SECRET!;
const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH!;

const COOKIE_NAME = 'session';
const TOKEN_EXPIRY = '8h';

interface TokenPayload {
  sub: string;
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USER) {
    return false;
  }

  return bcrypt.compare(password, ADMIN_PASS_HASH);
}

export function createToken(): string {
  const payload: TokenPayload = { sub: 'admin' };
  return jwt.sign(payload, SESSION_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SESSION_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function requireAuth(): Promise<void> {
  const session = await getSession();
  if (!session || session.sub !== 'admin') {
    throw new Error('Unauthorized');
  }
}
