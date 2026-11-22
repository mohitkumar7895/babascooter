import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { validatePhone } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product_id, product_name, customer_name, customer_phone, customer_email, city, message } = body;

    if (!customer_name || !customer_phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }

    if (!validatePhone(customer_phone)) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }

    const insertRes: any = await query(
      `INSERT INTO enquiries 
        (product_id, product_name, customer_name, customer_phone, customer_email, city, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'New')`,
      [
        product_id ? Number(product_id) : null,
        product_name || null,
        customer_name.trim(),
        customer_phone.trim(),
        customer_email?.trim() || null,
        city?.trim() || null,
        message?.trim() || 'Customer requested scooter details & test ride',
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully! Our representative will contact you shortly.',
      id: insertRes.insertId,
    });
  } catch (error: any) {
    console.error('Enquiry error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const enquiries = await query<any[]>('SELECT * FROM enquiries ORDER BY created_at DESC');
    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    await query('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true, message: 'Enquiry status updated' });
  } catch (error: any) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
