import { NextIntlClientProvider, hasLocale } from 'next-intl';
import "./globals.css";
import {notFound} from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Navbar/>
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}