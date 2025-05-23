"use client";
import React, { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import dynamic from "next/dynamic";
import Head from "./(links)/head/page";
import AboutSection from "@/components/sections/About";

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: { 
      escapeValue: false 
    },
    detection: {
      order: ["cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: '/locale/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    }
  });

function Home() {
  const { ready } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (ready) {
      document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage, ready]);

  if (!ready) return <div>Loading...</div>;

  return (
    <>
      <Head />
      <AboutSection />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});