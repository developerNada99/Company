"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const images = ["/images/pho1.jpg", "/images/pho2.jpg", "/images/pho3.jpg"];

function Head() {
  const t = useTranslations("HeadPage");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage((prev) => (prev + 1) % images.length),
      9000
    );
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    if (typeof window !== "undefined") {
      const nextPosition = window.pageYOffset + window.innerHeight;
      window.scrollTo({
        top: nextPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden" id="home-section">
      {/* Background Images */}
      <div className="absolute inset-0 bg-black z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Background ${index}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-28 xl:px-32 text-white max-md:items-center max-md:text-center">
        <motion.div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-medium mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="max-w-2xl text-[#a8b3c9] text-base sm:text-lg mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          >
            {t("HeadParagraph")}
          </motion.p>

          <motion.button
            className="bg-[#7283a6] w-full sm:w-fit hover:bg-transparent border-[#7283a6] border py-3 px-6 sm:px-10 rounded-full font-semibold transition duration-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          >
            {t("Explore Now")}
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleScrollDown()}
      >
        <ChevronDown 
          size={40} 
          className="text-white animate-bounce hover:text-[#a8b3c9] transition-colors duration-300" 
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

export default Head;