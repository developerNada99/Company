"use client";

import React, { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookie from "js-cookie";
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
    interpolation: { escapeValue: false },
    detection: {
      order: [
        'cookie',
        'htmlTag',
        'localStorage',
        'sessionStorage',
        'navigator',
        'path',
        'subdomain',
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: '/locale/{{lng}}/translation.json',
    }
  });

function Home() {
  const { t } = useTranslation();
  
  const lng = cookie.get("i18next") || "en";
  
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <>
      <Head />
      <AboutSection/>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });