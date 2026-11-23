import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const rows = await query<any[]>(
      'SELECT id, username, email, name, role FROM admins WHERE id = ? LIMIT 1',
      [auth.session!.id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ user: rows[0] });
  } catch (error: any) {
    console.error('Fetch admin profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { currentPassword, newPassword, name, email } = await req.json();

    const rows = await query<any[]>(
      'SELECT id, password_hash FROM admins WHERE id = ? LIMIT 1',
      [auth.session!.id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    const admin = rows[0];

    // If changing password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password is required to change password' }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
      if (!isMatch) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
      }

      const newHash = await bcrypt.hash(newPassword, 10);
      await query('UPDATE admins SET password_hash = ? WHERE id = ?', [newHash, auth.session!.id]);
    }

    // Update name and email if provided
    if (name || email) {
      await query(
        'UPDATE admins SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?',
        [name?.trim() || null, email?.trim() || null, auth.session!.id]
      );
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
