"use client"
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"
import AboutSection from "@/components/sections/About";



const About = () => {
    const { t } = useTranslation();
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

    return (
        <div 
            className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center bg-no-repeat"
            style={{
                background: 'linear-gradient(135deg, #121620, #1e2432, #282e3b, #3a4253, #4b566a)',
                backgroundSize: '100% 100%',
                minHeight: '100vh',
            }}
        >
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
                            {t("About")}
                        </motion.h1>
            </motion.div>
            <About/>
        </div>
    );
};

export default About;