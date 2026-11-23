import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { revalidatePublicSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const contactRows = await query<any[]>('SELECT * FROM contact_settings LIMIT 1');
    const websiteRows = await query<any[]>('SELECT setting_key, setting_value FROM website_settings');

    const websiteSettings: Record<string, string> = {};
    websiteRows.forEach((r) => {
      websiteSettings[r.setting_key] = r.setting_value;
    });

    return NextResponse.json({
      success: true,
      contact: contactRows[0] || null,
      website: websiteSettings,
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const { contact, website } = body;

    if (contact) {
      const existingContact = await query<any[]>('SELECT id FROM contact_settings LIMIT 1');
      const serializedAdditionalPhones =
        contact.additional_phones !== undefined && contact.additional_phones !== null
          ? typeof contact.additional_phones === 'string'
            ? contact.additional_phones
            : JSON.stringify(contact.additional_phones)
          : null;

      if (existingContact && existingContact.length > 0) {
        await query(
          `UPDATE contact_settings SET
            business_name = COALESCE(?, business_name),
            brand_name = COALESCE(?, brand_name),
            tagline = COALESCE(?, tagline),
            address = COALESCE(?, address),
            primary_phone = COALESCE(?, primary_phone),
            whatsapp_number = COALESCE(?, whatsapp_number),
            additional_phones = COALESCE(?, additional_phones),
            email = COALESCE(?, email),
            google_maps_url = COALESCE(?, google_maps_url),
            google_maps_embed = COALESCE(?, google_maps_embed),
            opening_hours = COALESCE(?, opening_hours)
           WHERE id = ?`,
          [
            contact.business_name ?? null,
            contact.brand_name ?? null,
            contact.tagline ?? null,
            contact.address ?? null,
            contact.primary_phone ?? null,
            contact.whatsapp_number ?? null,
            serializedAdditionalPhones,
            contact.email ?? null,
            contact.google_maps_url ?? null,
            contact.google_maps_embed ?? null,
            contact.opening_hours ?? null,
            existingContact[0].id,
          ]
        );
      } else {
        await query(
          `INSERT INTO contact_settings
            (business_name, brand_name, tagline, address, primary_phone, whatsapp_number, additional_phones, email, google_maps_url, google_maps_embed, opening_hours)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            contact.business_name || 'BABA MARKETING',
            contact.brand_name || 'FRENDO E-SCOOTY',
            contact.tagline || 'Drive Green, Live Better!',
            contact.address || '',
            contact.primary_phone || '',
            contact.whatsapp_number || '',
            serializedAdditionalPhones,
            contact.email || 'info@frendo.in',
            contact.google_maps_url || '',
            contact.google_maps_embed || '',
            contact.opening_hours || '',
          ]
        );
      }
    }

    if (website && typeof website === 'object') {
      for (const [key, value] of Object.entries(website)) {
        await query(
          `INSERT INTO website_settings (setting_key, setting_value)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);`,
          [key, String(value ?? '')]
        );
      }
    }

    revalidatePublicSite(['/', '/contact', '/features', '/batteries', '/about', '/location']);
    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
