"use client"
import React from 'react'
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Beds from '@/components/sections/Beds'
import Wardrobe from '@/components/sections/Wardrobe'
import LivingDiningRoom from '@/components/sections/LivingDiningRoom'


const HomesFurniture = () => {
    const { t } = useTranslation()

    // Enhanced animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.6
            }
        }
    }

    const item = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                duration: 0.8
            }
        }
    }

    return (
        <div className="relative">
            {/* Full-page gradient background */}
            <div 
                className="fixed top-0 left-0 w-full h-full -z-10"
                style={{
                    background: 'linear-gradient(135deg, #121620, #1e2432, #282e3b, #3a4253, #4b566a)',
                    backgroundSize: '100% 100%',
                    minHeight: '100vh', // عشان يبان التدرج
                  }}
                  
                  
            >
                <motion.div 
                    className="absolute inset-0"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%'],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 md:p-24">
                    <motion.div
                        className="max-w-4xl text-center"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 
                            className="text-5xl md:text-6xl font-bold text-white mb-8"
                            variants={item}
                        >
                            {t("homesfurniture")}
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl md:text-2xl text-[#c8d3f5] leading-relaxed mb-12"
                            variants={item}
                        >
                            {t("home_furniture_description")}
                        </motion.p>
                        <motion.button
                            className="px-10 py-4 bg-gradient-to-r from-[#7283a6] to-[#5a6a8a] text-white font-semibold rounded-lg shadow-lg"
                            variants={item}
                            whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                                }}
                            whileTap={{ scale: 0.95 }}
                         >
                            {t("Explore Now")}
                        </motion.button>
                    </motion.div>
                </div>

                {/* Product Sections */}
                <div className="bg-transparent">
                    <Beds />
                    <Wardrobe />
                    <LivingDiningRoom />
                </div>
            </div>
        </div>
    )
}

export default HomesFurniture