import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'baba_marketing_frendo_scooty_secure_jwt_secret_2026_xyz!'
);

const TOKEN_NAME = 'baba_admin_token';

export async function createAdminToken(payload: { id: number; username: string; email: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: number; username: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

export async function requireAuth(req?: NextRequest) {
  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    if (!token) {
      token = req.cookies.get(TOKEN_NAME)?.value;
    }
  }

  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get(TOKEN_NAME)?.value;
    } catch {}
  }

  if (!token) {
    return { error: 'Unauthorized: Authentication required', status: 401, session: null };
  }

  const session = await verifyAdminToken(token);
  if (!session) {
    return { error: 'Unauthorized: Invalid or expired session', status: 401, session: null };
  }

  return { error: null, status: 200, session };
}

export function setAdminCookie(token: string, res: NextResponse) {
  res.cookies.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return res;
}

export function clearAdminCookie(res: NextResponse) {
  res.cookies.set(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return res;
}
