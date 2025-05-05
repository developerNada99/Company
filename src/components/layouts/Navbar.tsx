"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import i18n from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const currentLang = cookies.get("i18next") || "en";
  const { t } = useTranslation(); // ✅ هنا

  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [currentLang]);

  const navItems = [
    { id: 'home', label: t("Home") },
    { id: 'about', label: t("About") },
    { id: 'services', label: t("Services") },
    { id: 'projects', label: t("Projects") },
    { id: 'contact', label: t("Contact Us") },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 py-4">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between md:flex-row">
        <div className="text-xl text-white flex-1/4">
          {t("PROFESSIONAL")}<span className='text-[#a8b3c9]'>{t("EXECUTION")}</span>
        </div>

        <div className="md:hidden cursor-pointer">
          <button
            className="text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* القائمة على الشاشات الكبيرة + زر اللغة */}
        <ul className="hidden md:flex gap-6 items-center flex-1/2">
          {navItems.map((item) => (
            <li key={item.id} onClick={() => setActive(item.id)}>
              <Link
                href={`#${item.id}`}
                scroll={false}
                className={`text-xl transition duration-300 ease-in-out ${
                  active === item.id ? 'text-[#a8b3c9]' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={toggleLanguage}
              className="text-white border border-white px-3 py-1 rounded-md text-sm"
            >
              {currentLang === "ar" ? "English" : "عربى"}
            </button>
          </li>
        </ul>
      </div>

      {/* القائمة في الموبايل + زر اللغة */}
      {menuOpen && (
        <ul className="flex flex-col h-full gap-4 md:hidden p-14 bg-white/10 backdrop-blur-md rounded-2xl">
          {navItems.map((item) => (
            <li
              key={item.id}
              className='w-full flex justify-center p-5'
              onClick={() => {
                setActive(item.id);
                setMenuOpen(false);
              }}
            >
              <Link
                href={`#${item.id}`}
                scroll={false}
                className={`text-xl transition duration-300 ease-in-out ${
                  active === item.id ? 'text-[#a8b3c9]' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className='flex justify-center'>
            <button
              onClick={toggleLanguage}
              className="text-white border border-white px-3 py-1 rounded-md text-sm"
            >
              {currentLang === "ar" ? "English" : "عربى"}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
