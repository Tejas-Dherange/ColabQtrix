'use client'

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface Step {
  id: string
  stepNumber: number
  title: string
  description: string
}

interface BottomImage {
  src: string
  alt: string
}

interface HowItWorksSectionProps {
  componentId?: string
  badge: string
  heading: string
  steps: Step[]
  bottomImage?: BottomImage
  _sectionId?: number
}

export default function HowItWorksSection({
  badge,
  heading,
  steps,
  bottomImage
}: HowItWorksSectionProps) {

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-darkBg overflow-hidden relative border-t border-slate-800/50">

      {/* Organic Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-[1px] bg-secondary/50" />
            <span className="text-[12px] font-black tracking-[0.3em] text-secondary uppercase">
              {badge}
            </span>
            <span className="w-12 h-[1px] bg-secondary/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Fluid Journey Layout */}
        <div className="relative max-w-5xl mx-auto">

          {/* Glowing Connecting Line (Vertical Desktop / Content Mobile) */}
          <div className="absolute left-[31px] sm:left-1/2 sm:-translate-x-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary/0 opacity-20 hidden sm:block" />

          <div className="space-y-16 sm:space-y-24">
            {(steps || []).map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className="relative">
                  <div className={`flex flex-col sm:flex-row items-center gap-12 lg:gap-24 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>

                    {/* Step Number Hub (Organic Round) */}
                    <div className="relative flex-shrink-0 z-20">
                      <motion.div
                        whileInView={{
                          scale: [0.8, 1.1, 1],
                          rotate: [0, 10, 0]
                        }}
                        viewport={{ once: true }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-2xl font-black text-secondary shadow-[0_0_30px_rgba(28,217,198,0.2)] relative"
                      >
                        {step.stepNumber}
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 rounded-full border border-secondary/40 animate-ping opacity-20" />
                      </motion.div>
                    </div>

                    {/* Step Content (Asymmetrical Layout) */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex-grow text-center sm:text-left ${!isEven ? 'sm:text-right' : ''}`}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto sm:mx-0 sm:ml-auto">
                        {step.description}
                      </p>

                      {/* Sub-steps / Indicators (Breaking the box) */}
                      <div className={`mt-8 flex flex-wrap gap-4 justify-center ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-secondary uppercase">
                          Quality Assured
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-primary uppercase">
                          Fast Delivery
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Image Component - Organic Masked Presentation */}

      </div>
    </section>
  )
}