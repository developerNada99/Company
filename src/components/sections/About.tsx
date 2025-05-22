"use client"
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
    const { t } = useTranslation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const images = [
        "/images/pho1.jpg",
        "/images/about1.jpg",
        "/images/pho2.jpg", 
        "/images/about2.jpg",
        "/images/pho3.jpg",
        "/images/about3.jpg",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [images.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        enter: { 
            opacity: 0,
            transition: { duration: 2, ease: "easeInOut" }
        },
        center: { 
            opacity: 1,
            transition: { duration: 2, ease: "easeInOut" }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 2, ease: "easeInOut" }
        }
    };

    return (
        <div 
            className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center bg-no-repeat"
            style={{
                background: 'linear-gradient(135deg, #121620, #1e2432, #282e3b, #3a4253, #4b566a)',
                backgroundSize: '100% 100%',
                minHeight: '100vh',
            }}
        >
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
                {/* Text Content - تم تعديل هذه القسم */}
                <motion.div 
                    className="lg:w-1/2 text-white lg:order-2 px-4 md:px-0 flex flex-col items-center justify-center text-center"
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.p 
                        className="text-base sm:text-xl md:text-xl mb-6 md:mb-8 leading-relaxed max-w-2xl"
                        variants={itemVariants}
                    >
                        {t('about.description')}
                    </motion.p>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="mt-4"
                    >
                        <button className="bg-[#7283a6] hover:bg-transparent hover:text-[#7283a6] cursor-pointer border-2 border-[#7283a6] text-white font-semibold py-3 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                            {t('Explore Now')}
                        </button>
                    </motion.div>
                </motion.div>

                {/* Image Carousel */}
                <div className="lg:w-1/2 lg:order-1 relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={imageVariants}
                            className="absolute inset-0"
                        >
                            <motion.img
                                src={images[currentImageIndex]}
                                alt="Furniture craftsmanship"
                                className="rounded-lg shadow-2xl w-full h-full object-cover"
                                style={{
                                    boxShadow: "15px 15px 30px rgba(74, 55, 55, 0.5)"
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10,
                                    duration: 0.5
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-4 absolute bottom-2 sm:bottom-4 left-0 right-0">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all duration-500 ${
                                    index === currentImageIndex ? 'bg-[#7283a6] w-4 sm:w-6' : 'bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;