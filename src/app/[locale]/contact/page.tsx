"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslations } from "next-intl";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
    const t = useTranslations("ContactPage");
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const socialMedia = [
    { icon: <FaFacebookF size={18} />, name: 'facebook', url: '#' },
    { icon: <FaTwitter size={18} />, name: 'twitter', url: '#' },
    { icon: <FaInstagram size={18} />, name: 'instagram', url: '#' },
    { icon: <FaLinkedinIn size={18} />, name: 'linkedin', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Contact Us | Office Furniture</title>
        <meta name="description" content="Get in touch with our office furniture experts" />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16 mt-20"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("contact")}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    {t("ParaContact")}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div 
            className="lg:w-1/2"
            variants={itemVariants}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-2xl"
            >
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-600 rounded-lg">
                  {t("message")}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-lg">{t("Full Name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7283a6]"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-lg">{t("Email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7283a6]"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block mb-2 text-lg">{t("Your Message")}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7283a6]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#7283a6] w-full hover:bg-transparent border-[#7283a6] border py-3 px-10 rounded-full font-semibold transition duration-300 mb-12"
                >
                {isSubmitting ? t("Sending") : t("Send Message")}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="lg:w-1/2"
            variants={itemVariants}
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 h-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-8">{t("Our Information")}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-[#7283a6] mt-1">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("Address")}</h3>
                    <p className="text-gray-300">123 Office Street, Furniture District<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#7283a6] mt-1">
                    <FaPhone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("Phone")}</h3>
                    <p className="text-gray-300">+1 (555) 123-4567<br />Mon-Fri: 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#7283a6] mt-1">
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("Email")}</h3>
                    <p className="text-gray-300">info@officefurniture.com<br />support@officefurniture.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">{t("Follow Us")}</h3>
                <div className="flex gap-4">
                  {socialMedia.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-[#7283a6] transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                      <span className="sr-only">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;