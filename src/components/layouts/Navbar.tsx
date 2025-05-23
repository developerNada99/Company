"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    closeAllMenus();
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const navItems = [
    { id: "home", label: t("Home"), path: "/" },
    { id: "about", label: t("About"), path: "/about" },
    {
      id: "furniture",
      label: t("Furniture"),
      subItems: [
        { id: "office-furniture", label: t("Office Furniture"), path: "/office-furniture" },
        { id: "home-furniture", label: t("Home Furniture"), path: "/home-furniture" },
      ],
    },
    { id: "projects", label: t("Projects"), path: "/projects" },
    { id: "contact", label: t("Contact Us"), path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl text-white">
          {t("PROFESSIONAL")}
          <span className="text-[#a8b3c9]">{t("EXECUTION")}</span>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden lg:flex gap-6 items-center">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-xl text-white"
                  >
                    {item.label}
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute left-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md shadow-lg py-2 z-50">
                      {item.subItems.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.path}
                            onClick={closeAllMenus}
                            className="block px-4 py-2 text-white hover:text-[#a8b3c9]"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  onClick={closeAllMenus}
                  className="text-xl text-white hover:text-[#a8b3c9]"
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
              {currentLanguage === "ar" ? "English" : "عربى"}
            </button>
          </li>
        </ul>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/70 z-40 mt-16" onClick={closeAllMenus}>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg mx-4 p-4" onClick={(e) => e.stopPropagation()}>
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="text-xl text-white w-full text-left py-2"
                        >
                          {item.label}
                        </button>
                        {dropdownOpen && (
                          <ul className="pl-4 space-y-2 mt-2">
                            {item.subItems.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={sub.path}
                                  onClick={closeAllMenus}
                                  className="block text-white hover:text-[#a8b3c9] py-1"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={closeAllMenus}
                        className="block text-xl text-white py-2"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <button
                    onClick={toggleLanguage}
                    className="text-white border border-white px-3 py-1 rounded-md text-sm mt-4"
                  >
                    {currentLanguage === "ar" ? "English" : "عربى"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});