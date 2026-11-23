import { revalidatePath, revalidateTag } from 'next/cache';

export function revalidatePublicSite(extraPaths: string[] = []) {
  try {
    revalidateTag('settings');
    revalidateTag('contact');
    revalidateTag('seo');
    revalidatePath('/', 'layout');
    for (const p of extraPaths) {
      revalidatePath(p);
    }
  } catch (err) {
    console.error('Revalidation warning:', err);
  }
}
