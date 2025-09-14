"use client";
import React from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Ready = () => {
  const t = useTranslations("Ready");

  return (
    <ParallaxProvider>
      <section className="relative h-[500px] overflow-hidden">
        {/* الخلفية مع تأثير Parallax */}
        <Parallax speed={-50}>
          <div className="relative h-screen w-full">
            <Image
              src="/images/about3.jpg"
              alt="Background"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black/80 z-10"></div>
          </div>
        </Parallax>

        {/* المحتوى */}
        <div className="absolute inset-0 z-20 max-w-4xl mx-auto h-full flex flex-col justify-center items-center text-center">
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
    </ParallaxProvider>
  );
};

export default Ready;
