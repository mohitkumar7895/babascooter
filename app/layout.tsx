import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloating from '@/components/layout/WhatsAppFloating';
import NavigationProgress from '@/components/layout/NavigationProgress';
import { getCachedContact } from '@/lib/data';
import { ContactSettings } from '@/types';

export const metadata: Metadata = {
  title: 'FRENDO E-SCOOTY | Drive Green, Live Better | Baba Marketing',
  description:
    'Welcome to FRENDO E-SCOOTY. Electric scooters starting at ₹15,000/- with LFP battery, 50 to 300 KM range, 5-year warranty, and exclusive B2B dealership & franchise packages across India.',
  keywords: [
    'FRENDO E-SCOOTY',
    'Baba Marketing',
    'Electric Scooty Dealership',
    'EV Franchise India',
    'LFP Battery Scooter',
    'Electric Scooter Faridabad',
    'Ballabhgarh EV Showroom',
    '3-Wheel Loader',
  ],
  icons: {
    icon: '/logo.jpeg?v=2',
    shortcut: '/logo.jpeg?v=2',
    apple: '/logo.jpeg?v=2',
  },
};

async function getContactData(): Promise<ContactSettings | undefined> {
  const contact = await getCachedContact();
  return contact || undefined;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getContactData();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.jpeg?v=2" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-brand-800 selection:text-amber-400">
        <NavigationProgress />
        <Header contact={contact} />
        <main className="flex-1">{children}</main>
        <Footer contact={contact} />
        <WhatsAppFloating
          whatsapp={contact?.whatsapp_number || '9953564151'}
          phone={contact?.primary_phone || '9953564151'}
        />
      </body>
    </html>
  );
}
