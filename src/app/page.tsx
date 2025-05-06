"use client";

import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import dynamic from "next/dynamic";
import Navbar from "@/components/layouts/Navbar";
import HeadTwo from "@/components/sections/HeadTwo";
import Head from "./links/head/page";

// i18n setup
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      fallbackLng: "en",
      detection: {
        order: [
          "cookie",
          "htmlTag",
          "localStorage",
          "sessionStorage",
          "navigator",
          "path",
          "subdomain",
        ],
        caches: ["cookie"],
      },
      backend: {
        loadPath: "/locale/{{lng}}/translation.json",
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

function Home() {
  const { t } = useTranslation();
  const currentLang = cookies.get("i18next") || "en";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();

    // Simulate loading delay (e.g. images/fonts)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // وقت التحميل بالمللي ثانية

    return () => clearTimeout(timer);
  }, [currentLang]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin h-16 w-16 rounded-full border-4 border-b-black border-[#a8b3c9] border-opacity-50"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Head />
      <HeadTwo/>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
