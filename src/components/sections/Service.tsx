"use client";
import React from 'react';
import Image from 'next/image';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Service = () => {
  const t = useTranslations("Service");
  
  const services = [
    {
      title: t("one"),
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris.",
      image: "/images/wardrobe4.jpg"
    },
    {
      title: t("two"),
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris.",
      image: "/images/meeting-table2.jpg"
    },
    {
      title: t("three"),
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris.",
      image: "/images/bed3.jpg"
    },
    {
      title: t("four"),
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris.",
      image: "/images/living-dining5.jpg"
    }
  ];

  // تأثيرات الظهور
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="py-16 px-4 mx-auto bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h1 
        className="text-center text-4xl font-medium mb-16 text-white"
        variants={itemVariants}
      >
        {t("title")}
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="relative group overflow-hidden rounded-xl h-96"
            variants={itemVariants}
          >
            {/* الصورة مع طبقة غامقة */}
            <div className="absolute inset-0 bg-black/60 z-10 transition-all duration-500 group-hover:bg-black/65"></div>
            
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* النص */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-lg opacity-90">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Service;