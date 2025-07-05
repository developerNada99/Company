"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from "next-intl";


const Ready = () => {
    const t = useTranslations("Ready");
  
  return (
    <section className="relative py-20 px-4 h-[500px] overflow-hidden">
      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about3.jpg" // استبدل بمسار صورتك
          alt="Background"
          fill
          className="object-cover"
          quality={100}
        />
        {/* طبقة غامقة */}
        <div className="absolute inset-0 bg-black/80 z-10"></div>
      </div>

      {/* المحتوى */}
      <div className="relative z-20 max-w-4xl mx-auto h-full flex flex-col justify-center items-center text-center">
        <motion.h2 
          className="text-4xl md:text-4xl font-medium mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
         {t("title")}
        </motion.h2>
        
        
        <motion.button
                  className="bg-[#7283a6] w-fit hover:bg-transparent text-white border-[#7283a6] border py-3 px-10 rounded-full font-semibold transition duration-300 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                  {t("btn")}
                </motion.button>
      </div>
    </section>
  );
};

export default Ready;