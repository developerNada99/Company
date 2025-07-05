import React from 'react';
import Link from 'next/link';
import { useTranslations } from "next-intl";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const t = useTranslations("Footer");
  const phoneNumber = '01152855971';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const socialLinks = [
    { icon: <FaWhatsapp />, url: whatsappUrl },
    { icon: <FaInstagram />, url: "https://instagram.com" },
    { icon: <FaFacebook />, url: "https://facebook.com" },
    { icon: <FaTwitter />, url: "https://twitter.com" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
        {/* روابط السوشيال ميديا */}
        <div className="flex space-x-6 text-2xl">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
              aria-label={`Social media link ${index}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>

        {/* حقوق النشر والمصنع */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved</span>
          <span className="hidden md:inline text-gray-500">|</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-1">{t("Made by")}</span>
            <Link 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
            >
              NadaAhmed
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;