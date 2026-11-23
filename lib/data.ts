import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { query } from './db';
import { ContactSettings } from '@/types';

const fetchContactFromDb = unstable_cache(
  async (): Promise<ContactSettings | null> => {
    try {
      const rows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('Failed to load contact settings:', err);
      return null;
    }
  },
  ['contact-settings'],
  { revalidate: 120, tags: ['settings', 'contact'] }
);

export const getCachedContact = cache(async (): Promise<ContactSettings | null> => {
  return await fetchContactFromDb();
});
