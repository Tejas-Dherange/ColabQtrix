'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Mail, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavLink {
  label: string
  href: string
}

interface NavBarProps {
  componentId?: string
  logo: { text: string; icon: string }
  links: NavLink[]
  contactInfo: { email: string; phone: string }
  _sectionId?: number
}

export default function NavBar({ logo, links, contactInfo, _sectionId }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Scroll Spy Logic
      const sections = links.map(link => {
        const id = link.href.replace('#', '')
        return document.getElementById(id)
      })

      const currentSection = sections.find(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        const link = links.find(l => l.href === `#${currentSection.id}`)
        if (link) setActiveLink(link.label)
      } else if (window.scrollY < 100) {
        setActiveLink('Home')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [links])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* 
        Floating Island NavBar 
      */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <motion.div
          layout
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: scrolled ? 16 : 32, 
            opacity: 1,
            // We use layout prop to handle the width transition smoothly between these states
            width: scrolled ? "unset" : "min(1400px, calc(100% - 48px))",
            backgroundColor: scrolled ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 23, 42, 0.4)",
            backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 30,
            mass: 1,
            opacity: { duration: 0.8 }
          }}
          className="pointer-events-auto flex items-center justify-between px-8 py-3 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Logo Section */}
          <motion.div layout className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 bg-white rounded-lg p-1.5 transition-transform group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <motion.span layout className="text-base font-bold text-gray-100 tracking-tight group-hover:text-secondary h-min">
              {logo.text}
            </motion.span>
          </motion.div>

          {/* Nav Links - Desktop Only */}
          <motion.ul layout className="hidden md:flex items-center gap-8 px-8">
            {links.map((link) => (
              <motion.li layout key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`text-[14px] font-semibold tracking-wide transition-all ${
                    activeLink === link.label
                    ? 'text-secondary drop-shadow-[0_0_8px_rgba(28,217,198,0.5)]'
                    : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Desktop Call to Action / Info */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div className="flex flex-col items-end text-[12px] leading-tight">
              <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-secondary transition-colors">
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-200 hover:text-white font-medium transition-colors">
                {contactInfo.phone}
              </a>
            </div>
            
            {/* Minimal Mobile Menu Toggle for Desktop-small */}
            <button
              className="md:hidden p-2 text-white hover:text-secondary transition"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Simple Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-secondary transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </motion.div>
      </header>

      {/* 
        Mobile Optimized Overlays 
      */}
      <div 
        className={`fixed inset-0 z-[60] bg-darkBg/90 backdrop-blur-md transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      >
        {/* Mobile Menu Content */}
        <div 
          className="h-full flex flex-col justify-center px-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            className="absolute top-10 right-10 p-3 text-white hover:text-secondary border border-white/10 rounded-full transition-all"
            onClick={closeMenu}
          >
            <X size={28} />
          </button>

          {/* Large Mobile Links */}
          <nav className="space-y-8">
             {links.map((link, i) => (
               <motion.div
                 key={link.label}
                 initial={{ opacity: 0, x: -20 }}
                 animate={menuOpen ? { opacity: 1, x: 0 } : {}}
                 transition={{ delay: i * 0.1 }}
               >
                 <Link
                   href={link.href}
                   onClick={closeMenu}
                   className="text-3xl font-bold text-white hover:text-secondary transition-colors block"
                 >
                   {link.label}
                 </Link>
               </motion.div>
             ))}
          </nav>

          {/* Footer of Mobile Menu */}
          <div className="mt-20 pt-10 border-t border-white/5 space-y-6">
            <div className="space-y-2">
              <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Contact</p>
              <a href={`mailto:${contactInfo.email}`} className="text-2xl text-white hover:text-primary transition-colors block font-light">
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="text-2xl text-white hover:text-primary transition-colors block font-light">
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}