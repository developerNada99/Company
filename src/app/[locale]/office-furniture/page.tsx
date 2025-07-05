"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tables from "@/components/sections/TablesMeeting";
import DeskChair from "@/components/sections/DeskChair";
import Chairs from "@/components/sections/Chairs";
import { useTranslations } from "next-intl";


function OfficeFurnitureComp() {
    const t = useTranslations("Office");
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.6 },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 10, stiffness: 100, duration: 0.8 },
    },
  };

  return (
    <div className="bg-gray-900 text-white">
    
      {/* Content */}
      <div className="container mx-auto px-4 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={item}
            >
              {t("Office Furniture")}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12"
              variants={item}
            >
              {t("office_furniture_description")}
            </motion.p>
          </motion.div>
        </div>

        {/* Sections */}
        <div className="space-y-32 pb-20">
          <Tables />
          <DeskChair />
          <Chairs />
        </div>
      </div>
    </div>
  );
}

export default OfficeFurnitureComp;