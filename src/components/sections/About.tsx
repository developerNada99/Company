"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

function AboutSection() {
  // 1. جميع استدعاءات الـ Hooks في الأعلى (يجب أن تكون بنفس الترتيب في كل render)
  const t = useTranslations("SectionAbout");
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // صور السلايدر (ليست hook فلا مشكلة في وضعها هنا)
  const images = [
    "/images/pho1.jpg",
    "/images/about1.jpg",
    "/images/pho2.jpg",
    "/images/about2.jpg",
    "/images/pho3.jpg",
    "/images/about3.jpg",
  ];

  // 2. useEffect واحد يجمع العمليات
  useEffect(() => {
    setMounted(true); // تأكيد أن المكون قد تم تركيبه
    
    const id = setInterval(
      () => setCurrentImageIndex((i) => (i + 1) % images.length),
      8000
    );
    
    return () => {
      clearInterval(id); // تنظيف عند إلغاء التركيب
    };
  }, [images.length]);

  // 3. التحقق من mounted بعد جميع استدعاءات الـ Hooks
  if (!mounted) return null;

  // متغيرات الحركة (ليست hooks)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    enter: { opacity: 0, transition: { duration: 2, ease: "easeInOut" } },
    center: { opacity: 1, transition: { duration: 2, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 2, ease: "easeInOut" } },
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-16 mt-9 bg-gray-900"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
        {/* النص */}
        <motion.div
          className="lg:w-1/2 text-white lg:order-2 px-4 md:px-0 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-base sm:text-xl md:text-xl mb-6 md:mb-8 leading-relaxed max-w-2xl"
            variants={itemVariants}
          >
            {t("about description")}
          </motion.p>

          <motion.div variants={itemVariants}>
            <button className="bg-[#7283a6] hover:bg-transparent hover:text-[#7283a6] border-2 border-[#7283a6] py-3 px-10 rounded-full transition-all duration-300">
              {t("Explore Now")}
            </button>
          </motion.div>
        </motion.div>

        {/* السلايدر */}
        <div className="lg:w-1/2 lg:order-1 relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.img
                src={images[currentImageIndex]}
                alt="Furniture craftsmanship"
                className="rounded-lg shadow-2xl w-full h-full object-cover"
                style={{ boxShadow: "15px 15px 30px rgba(74,55,55,0.5)" }}
                whileHover={{ scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  duration: 0.5,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* النقاط */}
          <div className="flex justify-center absolute bottom-2 sm:bottom-4 left-0 right-0">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all duration-500 ${
                  idx === currentImageIndex
                    ? "bg-[#7283a6] w-4 sm:w-6"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;