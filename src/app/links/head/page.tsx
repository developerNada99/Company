"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  "/images/pho1.jpg",
  "/images/pho2.jpg",
  "/images/pho3.jpg"
];

const Head = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* الصور المتبدلة */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out z-0 ${
            index === currentImage
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      ))}

      {/* طبقة التعتيم */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* المحتوى */}
      <div className="relative z-20 text-white p-8 flex items-center justify-center h-full flex-col text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          PROFESSIONAL EXECUTION
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="max-w-2xl"
        >
          Professional Execution Company is a leading company in providing innovative furniture solutions and providing all the needs of offices and hotels with high quality throughout the Kingdom of Saudi Arabia. It was founded on the principles of commitment and excellence, and we combine
        </motion.p>
      </div>
    </div>
  );
};

export default Head;
