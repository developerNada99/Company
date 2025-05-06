"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const images = [
  { src: "/images/pho1.jpg", blur: "/images/pho1-blur.jpg" },
  { src: "/images/pho2.jpg", blur: "/images/pho2-blur.jpg" },
  { src: "/images/pho3.jpg", blur: "/images/pho3-blur.jpg" }
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
    <div className="relative w-full h-screen overflow-x-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out z-0 ${
            index === currentImage
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={img.src}
            alt={`Background ${index}`}
            fill
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={img.blur}
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/70 z-10"></div>

      <div className="relative z-20 text-white p-8 flex items-start max-md:items-center max-md:text-center justify-center h-full flex-col">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {t("PROFESSIONAL EXECUTION")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="max-w-2xl text-[#a8b3c9]"
        >
          {t("HeadParagraph")}
        </motion.p>
      </div>
    </div>
  );
};

export default Head;
