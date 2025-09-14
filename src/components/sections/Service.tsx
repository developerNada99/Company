"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Service = () => {
  const t = useTranslations("Service");

  const images = [
    { src: "/images/desk-chair4.jpg", rotate: 45, title: t("Ergonomic Desk Chair"), desc: t("Designed for comfort and productivity") },
    { src: "/images/meeting-table4.jpg", rotate: 30, title: t("Modern Meeting Table"), desc: t("Perfect for collaboration and style") },
    { src: "/images/living-dining1.jpg", rotate: 20, title: t("Living & Dining Set"), desc: t("A blend of elegance and practicality") },
    { src: "/images/bed5.jpg", rotate: 0, title: t("Cozy Minimalist Bed"), desc: t("Simplicity that ensures restful sleep") },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false); // عشان نمنع التنفيذ في أول تحميل

  // السماح بعد أول ما الصفحة تتحمل
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".image-card")) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ready]);

  return (
    <div className="py-16 min-h-screen px-4 mx-auto overflow-hidden bg-gray-900">
      {/* العنوان */}
      <motion.h1
        className="ttt text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-10 text-white"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {t("title")}
      </motion.h1>

      {/* الصور */}
      <div className="flex justify-center gap-6 relative flex-wrap">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="image-card w-[250px] h-[250px] relative group overflow-hidden rounded-xl shadow-2xl cursor-pointer"
            initial={{ opacity: 0, rotate: img.rotate, y: -50 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1, delay: i * 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            {/* الصورة */}
            <Image
              alt={`image-${i}`}
              src={img.src}
              fill
              className={`object-cover transition-all duration-700 ${activeIndex === i ? "scale-110 brightness-50" : ""}`}
            />

            {/* الـ Overlay مع Gradient */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={activeIndex === i ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 
              bg-gradient-to-t from-[#1e3c72]/80 via-[#2a5298]/10 to-transparent"
            >
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{img.title}</h1>
              <p className="text-xs sm:text-sm md:text-base">{img.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* النص اللي تحت */}
      <motion.p
        className="ttt text-center text-sm sm:text-base md:text-lg lg:text-xl mt-8 text-gray-400 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      >
        {t("description")}
      </motion.p>

      {/* الزرار */}
      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
      >
        <button className="bg-[#7283a6] w-fit cursor-pointer hover:bg-transparent text-white border-[#7283a6] border py-3 px-8 sm:px-10 rounded-full font-semibold transition duration-300 text-sm sm:text-base md:text-lg">
          {t("btn")}
        </button>
      </motion.div>
    </div>
  );
};

export default Service;
