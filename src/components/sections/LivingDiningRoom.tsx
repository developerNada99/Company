"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";


function LivingDiningRoom() {
    const t = useTranslations("LivingDiningRoom");
  


  const tableImages = [
    "/images/living-dining1.jpg",
    "/images/living-dining2.jpg",
    "/images/living-dining3.jpg",
    "/images/living-dining4.jpg",
    "/images/living-dining5.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tableImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tableImages.length]);


  return (
    <div className="min-h-full flex flex-col md:flex-row m-3 gap-2">
      {/* Left Column - Images */}
      <motion.div
        className="w-full md:w-1/2 h-96 md:h-auto relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {tableImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              transition: { duration: 1.5 },
            }}
          >
            <Image
              src={image}
              alt={`Living & Dining Room ${index + 1}`}
              fill
              className="object-cover"
              quality={100}
              priority={index === 0}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Right Column - Content */}
      <div className="w-full md:w-1/2 bg-[#141923] flex items-center justify-center p-8 md:p-12 border-2 border-[#5f6f90] rounded-2xl">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-lg"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("Living&Dining Rooms")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[#a8b3c9] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {t("ParaLiving&Dining")}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default LivingDiningRoom;
