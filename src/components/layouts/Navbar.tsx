'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 py-4">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between md:flex-row">
        {/* اللوجو على الشمال */}
        <div className="text-xl text-white flex-1/4">
          PROFESSIONAL<span className='text-[#a8b3c9]'>EXECUTION</span>
        </div>

        {/* زر المينيو على اليمين - يظهر فقط في الموبايل */}
        <div className="md:hidden cursor-pointer">
          <button
            className="text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* القائمة على الشاشات الكبيرة */}
        <ul className="hidden md:flex gap-6 items-center flex-1/2">
          {navItems.map((item) => (
            <li key={item.id} onClick={() => setActive(item.id)}>
              <Link
                href={`#${item.id}`}
                scroll={false}
                className={`text-xl transition duration-300 ease-in-out ${
                  active === item.id ? 'text-[#a8b3c9]' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* القائمة في الموبايل أسفل الزر */}
      {menuOpen && (
        <ul className="flex flex-col h-full gap-4  md:hidden p-14  bg-white/10 backdrop-blur-md rounded-2xl">
          {navItems.map((item) => (
            <li
                  key={item.id}
                  className=' w-full flex justify-center p-5'
              onClick={() => {
                setActive(item.id);
                setMenuOpen(false);
              }}
            >
              <Link
                href={`#${item.id}`}
                scroll={false}
                className={`text-xl transition duration-300 ease-in-out ${
                  active === item.id ? 'text-[#a8b3c9]' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
