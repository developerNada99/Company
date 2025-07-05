'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const BtnChangLang = () => {
    const locale = useLocale();
    const pathname = usePathname();

    // إزالة البادئة الحالية للغة من المسار
    const pathWithoutLocale = pathname?.replace(`/${locale}`, '') || '/';

    return (
        <Link 
            href={`/${locale.toLowerCase() === "en" ? "ar" : "en"}${pathWithoutLocale}`}
             className="text-white border border-white px-3 py-1 rounded-md text-sm"
        >
            {locale.toLowerCase() === "en" ? "العربية" : "English"}
        </Link>
    );
}

export default BtnChangLang;