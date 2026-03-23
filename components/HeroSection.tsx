'use client'

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface HeroButton {
  label: string
  href: string
}

interface HeroSectionProps {
  componentId?: string
  title: string
  subtitle: string
  primaryButton: HeroButton
  secondaryButton: HeroButton
  image?: string // Note: Kept for API compatibility, but we hardcode hero2.jpg per design request
  _sectionId?: number
}

export default function HeroSection({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-darkBg"
    >
      {/* 
        Grid Pattern Background
      */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* 
        Modern Dark Background elements - Animated Orbs
      */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/15 rounded-full blur-[120px] pointer-events-none z-0" 
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 flex flex-col items-start lg:items-center text-left lg:text-center mt-10">

        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-[1px] bg-secondary/50 hidden lg:block" />
          <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] text-secondary uppercase glow-border inline-block border border-secondary/20 px-4 py-1.5 rounded-full">
            Modernize Your Future
          </span>
          <div className="w-10 h-[1px] bg-secondary/50 hidden lg:block" />
        </motion.div>

        {/* Title - Deep Dark Typography with Character Reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.03, delayChildren: 0.2 }
            }
          }}
          className="text-[56px] sm:text-[64px] md:text-[76px] lg:text-[90px] font-bold text-white leading-[1.05] tracking-tight mb-8"
        >
          {title.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mr-4">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={{
                    hidden: { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0, 
                      filter: 'blur(0px)',
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  className={`inline-block ${ (wordIndex === 3 || wordIndex === 4) ? 'text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary drop-shadow-[0_0_15px_rgba(28,217,198,0.3)] animate-pulse-subtle' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle with reveal */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.04, delayChildren: 1.2 }
            }
          }}
          className="text-[18px] md:text-[22px] text-gray-400 mb-14 max-w-[750px] leading-[1.6] font-light"
        >
          {subtitle.split(' ').map((word, i) => (
             <motion.span 
               key={i} 
               variants={{
                 hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                 visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
               }}
               className="inline-block mr-1.5"
             >
               {word}
             </motion.span>
          ))}
        </motion.p>

        {/* Buttons Array */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start lg:items-center gap-5 w-full lg:w-auto"
        >
          {primaryButton && (
            <a
              href={primaryButton.href}
              className="w-full sm:w-auto group relative flex justify-center items-center gap-3 bg-secondary text-darkBg px-10 py-4 rounded-lg font-bold tracking-wide shadow-glow hover:shadow-glow-hover transition-all hover:-translate-y-1"
            >
              <span className="relative z-10 text-[15px]">{primaryButton.label}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
            </a>
          )}

          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className="w-full sm:w-auto flex justify-center items-center gap-3 bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:border-white/30 px-10 py-4 rounded-lg font-medium tracking-wide transition-all hover:bg-white/10"
            >
              <span className="text-[15px]">{secondaryButton.label}</span>
            </a>
          )}
        </motion.div>

      </div>
    </section>
  )
}