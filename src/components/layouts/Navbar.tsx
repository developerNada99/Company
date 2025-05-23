"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import i18n from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

function Navbar() {
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [furnitureDropdownOpen, setFurnitureDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (cookies.get("i18next") as "en" | "ar") || "en";
    setLang(stored);
    i18n.changeLanguage(stored); // Changed from i18nInstance to i18n
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLanguage = () => {
    const newLang: "en" | "ar" = lang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang); // Changed from i18nInstance to i18n
    cookies.set("i18next", newLang);
    setLang(newLang);
  };

  if (!mounted || !ready) return null;

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

  const toggleFurnitureDropdown = () => setFurnitureDropdownOpen(!furnitureDropdownOpen);
  const closeAllMenus = () => {
    setMenuOpen(false);
    setFurnitureDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 py-2">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-lg -z-30" />
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between md:flex-row">
        {/* Logo */}
        <div className="text-xl text-white flex-1/4">
          {t("PROFESSIONAL")}
          <span className="text-[#a8b3c9]">{t("EXECUTION")}</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="hidden max-lg:flex cursor-pointer">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="flex max-lg:hidden gap-6 items-center flex-1/2">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              {item.subItems ? (
                <>
                  <button
                    onClick={toggleFurnitureDropdown}
                    className={`text-xl transition hover:text-[#a8b3c9] ${
                      active.startsWith("furniture") ? "text-[#a8b3c9]" : "text-white"
                    }`}
                  >
                    {item.label}
                  </button>

                  {furnitureDropdownOpen && (
                    <ul className="absolute left-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md shadow-lg py-2 z-50">
                      {item.subItems.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.path}
                            onClick={() => {
                              setActive(sub.id);
                              closeAllMenus();
                            }}
                            className={`block px-4 py-2 text-xl hover:text-[#a8b3c9] ${
                              active === sub.id ? "text-[#a8b3c9]" : "text-white"
                            }`}
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
                  onClick={() => {
                    setActive(item.id);
                    closeAllMenus();
                  }}
                  className={`text-xl transition hover:text-[#a8b3c9] ${
                    active === item.id ? "text-[#a8b3c9]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* Language Toggle */}
          <li>
            <button
              onClick={toggleLanguage}
              className="text-white border border-white px-3 py-1 rounded-md text-sm"
            >
              {lang === "ar" ? "English" : "عربى"}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="hidden max-lg:flex flex-col gap-4 p-14 bg-white/10 backdrop-blur-md rounded-2xl">
          {navItems.map((item) => (
            <li key={item.id} className="flex flex-col items-center p-2">
              {item.subItems ? (
                <>
                  <button
                    onClick={toggleFurnitureDropdown}
                    className={`text-xl ${
                      active.startsWith("furniture") ? "text-[#a8b3c9]" : "text-white"
                    }`}
                  >
                    {item.label}
                  </button>

                  {furnitureDropdownOpen && (
                    <ul className="w-full mt-2 space-y-2">
                      {item.subItems.map((sub) => (
                        <li key={sub.id} className="text-center">
                          <Link
                            href={sub.path}
                            onClick={() => {
                              setActive(sub.id);
                              closeAllMenus();
                            }}
                            className={`block text-xl ${
                              active === sub.id ? "text-[#a8b3c9]" : "text-white"
                            }`}
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
                  onClick={() => {
                    setActive(item.id);
                    closeAllMenus();
                  }}
                  className={`text-xl transition hover:text-[#a8b3c9] ${
                    active === item.id ? "text-[#a8b3c9]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* Mobile Language Toggle */}
          <li className="flex justify-center">
            <button
              onClick={toggleLanguage}
              className="text-white border border-white px-3 py-1 rounded-md text-sm"
            >
              {lang === "ar" ? "English" : "عربى"}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });