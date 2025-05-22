"use client"
import React from 'react'
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Image from 'next/image'

const DeskChair = () => {
    const { t } = useTranslation()
    
    // Desk chair images
    const chairImages = [
        '/images/desk-chair1.jpg',
        '/images/desk-chair2.jpg',
        '/images/desk-chair3.jpg',
        '/images/desk-chair4.jpg',
       '/images/desk-chair5.jpg',
    ]
    
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % chairImages.length)
        }, 5000) // Change image every 5 seconds
        
        return () => clearInterval(interval)
    }, [])
    
    return (
        <div className="min-h-full flex flex-col md:flex-row m-3 gap-2">
            {/* Left Column - Content (50% width) */}
            <div className="w-full md:w-1/2 bg-[#141923] flex items-center justify-center p-8 md:p-12 order-2 md:order-1 border-2 border-[#5f6f90] rounded-2xl">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
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
                        {t("Individual Office")}
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg md:text-xl text-[#a8b3c9] mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        {t("ParaIndividualOffice")}
                    </motion.p>
                </motion.div>
            </div>
            
            {/* Right Column - Images (50% width) */}
            <motion.div 
                className="w-full md:w-1/2 h-96 md:h-auto relative order-1 md:order-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {chairImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: index === currentImageIndex ? 1 : 0,
                            transition: { duration: 1.5 }
                        }}
                    >
                        <Image
                            src={image}
                            alt={`Desk Chair ${index + 1}`}
                            fill
                            className="object-cover"
                            quality={100}
                            priority={index === 0}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default DeskChair