'use client'

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Code, BarChart, ServerCog, FlaskConical, Cpu, Layers, ArrowRight } from "lucide-react"

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  image?: string
}

const ICON_MAP: Record<string, any> = {
  code: Code,
  strategy: BarChart,
  support: ServerCog,
  research: FlaskConical,
  development: Cpu,
  integration: Layers
}

interface Props {
  heading: string
  description: string
  services: ServiceItem[]
}

export default function ServicesSection({
  heading,
  description,
  services
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle for visual dynamism
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [services.length]);

  return (
    <section id="services" className="py-16 md:py-24 bg-darkBg text-white overflow-hidden relative">
      {/* Organic Background Blobs (Moving) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Content (Sticky-like feel) */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-12 h-[1px] bg-secondary/50" />
                <span className="text-[12px] font-black tracking-[0.3em] text-secondary uppercase">
                  Our Capabilities
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-8 leading-[1.05] tracking-tight"
              >
                {heading.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg font-light leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>
            </div>

            {/* Interactive List (Un-boxed) */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center gap-6 w-full text-left transition-all duration-500 py-4 border-b border-white/5 hover:border-secondary/30 ${
                    activeIndex === index ? "translate-x-4" : "opacity-40 hover:opacity-100"
                  }`}
                >
                  <span className={`text-4xl font-black ${activeIndex === index ? "text-secondary" : "text-white/10"}`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={`text-lg font-bold transition-colors ${activeIndex === index ? "text-white" : "text-gray-400"}`}>
                      {service.title}
                    </h3>
                  </div>
                  <ArrowRight 
                    className={`ml-auto transition-all ${
                      activeIndex === index ? "opacity-100 translate-x-0 text-secondary" : "opacity-0 -translate-x-4"
                    }`} 
                    size={20} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual Showcase (The 'Orbital' design) */}
          <div className="w-full lg:w-1/2 relative aspect-square flex items-center justify-center">
            
            {/* Rotating Decorative Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/5 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-16 border border-white/10 rounded-full border-dashed"
            />

            {/* Central Floating Card (Highly Rounded) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 1.1, opacity: 0, rotateY: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-4/5 h-4/5 bg-slate-900/60 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 flex flex-col items-center justify-center text-center shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Floating Image Spill */}
                {services[activeIndex].image && (
                  <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="relative w-full aspect-video mb-8 -mt-20 filter drop-shadow-[0_20px_40px_rgba(28,217,198,0.2)]"
                  >
                    <Image 
                      src={services[activeIndex].image} 
                      alt="" 
                      fill 
                      className="object-contain" 
                    />
                  </motion.div>
                )}

                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-darkBg mb-8 shadow-glow">
                  {React.createElement(ICON_MAP[services[activeIndex].icon] || Code, { size: 40 })}
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  {services[activeIndex].title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  {services[activeIndex].description}
                </p>

                {/* Subtle Glow behind icons */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Orbiting Elements (Floating Icons) */}
            {services.map((s, idx) => {
              const angle = (idx * (360 / services.length)) * (Math.PI / 180);
              const x = 45 * Math.cos(angle);
              const y = 45 * Math.sin(angle);
              const Icon = ICON_MAP[s.icon] || Code;

              return (
                <motion.div
                  key={`orbit-${s.id}`}
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, idx % 2 === 0 ? 10 : -10, 0]
                  }}
                  transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-30 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-slate-800/80 backdrop-blur-xl border border-white/10 text-gray-400"
                  style={{ 
                    top: `${50 + y}%`, 
                    left: `${50 + x}%`,
                  }}
                >
                  <Icon size={20} />
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  );
}