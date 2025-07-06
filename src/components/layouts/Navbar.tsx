"use client";
import React, { useState } from "react";
import Link from "next/link";
import BtnChangLang from "../lang/BtnChangLang";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

function Navbar() {
  const t = useTranslations("Navbar");
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [furnitureDropdownOpen, setFurnitureDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: t("home"), path: "/" },
    { id: "about", label: t("about"), path: "/about" },
    {
      id: "furnitures",
      label: t("furnitures"),
      subItems: [
        { id: "office-furniture", label: t("Office Furniture"), path: "/office-furniture" },
        { id: "home-furniture", label: t("Home Furniture"), path: "/home-furniture" },
      ],
    },
    { id: "contact", label: t("contact"), path: "/contact" },
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
        <div className="text-2xl font-bold text-white flex-1/4">
          {t("Royal")}
          <span className="text-[#a8b3c9]">{t("Comfort")}</span>
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
                    className={`text-xl transition hover:text-[#a8b3c9] flex items-center gap-1 ${
                      active.startsWith("furnitures") ? "text-[#a8b3c9]" : "text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform mt-1 ${
                        furnitureDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
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
            <BtnChangLang />
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
                    className={`text-xl flex items-center gap-1 ${
                      active.startsWith("furnitures") ? "text-[#a8b3c9]" : "text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${
                        furnitureDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
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
            <BtnChangLang />
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;