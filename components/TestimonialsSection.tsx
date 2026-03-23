'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  author: string
}

interface TestimonialsSectionProps {
  sectionLabel: string
  heading: string
  subheading: string
  items: Testimonial[]
}

export default function TestimonialsSection({
  sectionLabel,
  heading,
  subheading,
  items
}: TestimonialsSectionProps) {

  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = items[index]
  const avatarLetter = testimonial.author.charAt(0).toUpperCase()

  return (
    <section className="py-16 md:py-20 relative bg-darkBg overflow-hidden">
      
      {/* Dark Background Graphic Block */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[45%] bg-slate-900/50 rounded-l-[3rem] hidden lg:block border-l border-slate-800" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT SIDE - Header Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-secondary rounded-full" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase glow-border border border-secondary/20 px-3 py-1 rounded-full">
                {sectionLabel}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              {heading}
            </h2>

            <p className="text-base text-gray-400 mt-6 leading-[1.6] font-light max-w-sm">
              {subheading}
            </p>

            {/* Custom Nav Controls */}
            <div className="hidden lg:flex gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-darkBg hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-glow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-darkBg hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-glow"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>


          {/* RIGHT SIDE - Overlapping Premium Dark Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 lg:-ml-10 relative"
          >
            <div className="dark-card bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 min-h-[360px] flex flex-col justify-between relative overflow-hidden group">
              
              <div className="absolute inset-0 border border-slate-700/50 rounded-[2.5rem] group-hover:border-secondary/20 transition-colors duration-500 pointer-events-none" />
              <Quote className="absolute top-10 right-10 w-32 h-32 text-slate-800 -rotate-12 z-0 pointer-events-none" />

              <div className="relative z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-col h-full absolute inset-0 pt-2 pb-6"
                  >
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-[1.6] font-light tracking-tight h-[150px] overflow-hidden">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-5 mt-auto">
                      <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-secondary shadow-[0_0_15px_rgba(28,217,198,0.15)]">
                        {avatarLetter}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white leading-tight">
                          {testimonial.author}
                        </p>
                        <p className="text-sm font-medium text-primary tracking-wide uppercase mt-1">
                          Verified Client
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="h-[220px] md:h-[240px] pointer-events-none opacity-0" />
              </div>

            </div>

            {/* Mobile / Tablet Nav Controls */}
            <div className="flex lg:hidden items-center justify-between mt-8">
              {/* Dot indicators */}
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-secondary shadow-[0_0_8px_rgba(28,217,198,0.5)]"
                        : "w-2 bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-gray-400 shadow-md hover:bg-slate-800"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-gray-400 shadow-md hover:bg-slate-800"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  )
}