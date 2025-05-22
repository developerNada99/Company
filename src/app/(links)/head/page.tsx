"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const images = [
  "/images/pho1.jpg",
  "/images/pho2.jpg",
  "/images/pho3.jpg"
];

const Head = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* طبقة الخلفية الثابتة */}
      <div className="absolute inset-0 bg-black z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`Background ${index}`}
              fill
              priority={index === 0}
              className="object-cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        ))}
      </div>

      {/* طبقة التعتيم */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* المحتوى */}
      <div className="relative z-20 text-white p-8 flex items-start max-md:items-center max-md:text-center justify-center h-full flex-col mx-16 max-lg:mx-0">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {t("PROFESSIONAL EXECUTION")}
        </motion.h1>

        <motion.p
          className="max-w-2xl text-[#a8b3c9] text-lg mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        >
          {t("HeadParagraph")}
        </motion.p>

        <motion.button
          className="bg-[#7283a6] hover:bg-transparent cursor-pointer border-[#7283a6] border text-white font-semibold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        >
          {t("Explore Now")}
        </motion.button>
      </div>
    </div>
  );
};

export default Head;