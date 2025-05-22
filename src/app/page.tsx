"use client";

import React, { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import dynamic from "next/dynamic";
import Head from "./(links)/head/page";

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

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [currentLang]);

  return (
    <>
      <Head />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });