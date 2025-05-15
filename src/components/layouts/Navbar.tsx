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
  const [furnitureDropdownOpen, setFurnitureDropdownOpen] = useState(false);
  const currentLang = cookies.get("i18next") || "en";
  const { t } = useTranslation();

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
    { 
      id: 'furniture', 
      label: t("Furniture"),
      subItems: [
        { id: 'office-furniture', label: t("Office Furniture") },
        { id: 'home-furniture', label: t("Home Furniture") }
      ]
    },
    { id: 'projects', label: t("Projects") },
    { id: 'contact', label: t("Contact Us") },
  ];

  const toggleFurnitureDropdown = () => {
    setFurnitureDropdownOpen(!furnitureDropdownOpen);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setFurnitureDropdownOpen(false);
  };

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

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center flex-1/2">
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className="relative"
            >
              {item.subItems ? (
                <>
                  <button 
                    className={`text-xl transition duration-300 ease-in-out hover:text-[#a8b3c9] ${
                      active.startsWith('furniture') ? 'text-[#a8b3c9]' : 'text-white'
                    }`}
                    onClick={toggleFurnitureDropdown}
                  >
                    {item.label}
                  </button>
                  
                  {furnitureDropdownOpen && (
                    <ul className="absolute left-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md shadow-lg py-2 z-50">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            href={`#${subItem.id}`}
                            scroll={false}
                            className={`block px-4 py-2 text-xl hover:text-[#a8b3c9] ${
                              active === subItem.id ? 'text-[#a8b3c9]' : 'text-white'
                            }`}
                            onClick={() => {
                              setActive(subItem.id);
                              closeAllMenus();
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={`#${item.id}`}
                  scroll={false}
                  className={`text-xl transition duration-300 ease-in-out hover:text-[#a8b3c9] ${
                    active === item.id ? 'text-[#a8b3c9]' : 'text-white'
                  }`}
                  onClick={() => {
                    setActive(item.id);
                    closeAllMenus();
                  }}
                >
                  {item.label}
                </Link>
              )}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col h-full gap-4 md:hidden p-14 bg-white/10 backdrop-blur-md rounded-2xl">
          {navItems.map((item) => (
            <li key={item.id} className='w-full flex flex-col justify-center items-center p-2'>
              {item.subItems ? (
                <>
                  <button 
                    className={`text-xl ${
                      active.startsWith('furniture') ? 'text-[#a8b3c9]' : 'text-white'
                    }`}
                    onClick={toggleFurnitureDropdown}
                  >
                    {item.label}
                  </button>
                  
                  {furnitureDropdownOpen && (
                    <ul className="w-full mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id} className="w-full text-center">
                          <Link
                            href={`#${subItem.id}`}
                            scroll={false}
                            className={`block text-xl ${
                              active === subItem.id ? 'text-[#a8b3c9]' : 'text-white'
                            }`}
                            onClick={() => {
                              setActive(subItem.id);
                              closeAllMenus();
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={`#${item.id}`}
                  scroll={false}
                  className={`text-xl transition duration-300 ease-in-out hover:text-[#a8b3c9] ${
                    active === item.id ? 'text-[#a8b3c9]' : 'text-white'
                  }`}
                  onClick={() => {
                    setActive(item.id);
                    closeAllMenus();
                  }}
                >
                  {item.label}
                </Link>
              )}
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