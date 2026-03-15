'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
}

interface NavBarProps {
  componentId?: string;
  logo: { text: string; icon: string };
  links: NavLink[];
  contactInfo: { email: string; phone: string };
  _sectionId?: number;
}

export default function NavBar({ logo, links, contactInfo, _sectionId }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${_sectionId ? 'relative' : 'fixed top-0 left-0 right-0'} z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
    >
      {/* Top info bar */}
      <div className="bg-primary text-white text-sm py-1.5 px-4 text-center hidden md:block">
        <span className="mr-6">📧 {contactInfo.email}</span>
        <span>📞 {contactInfo.phone}</span>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-primary/30 transition-shadow">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-primary text-lg hidden sm:block">{logo.text}</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 text-gray-700 hover:text-primary hover:bg-mint rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100 text-sm text-gray-500">
            <div>{contactInfo.email}</div>
            <div>{contactInfo.phone}</div>
          </div>
        </div>
      )}
    </nav>
  );
}
