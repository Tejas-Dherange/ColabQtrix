'use client'

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Target, Lightbulb, CheckCircle2, Shield, Zap, Heart } from "lucide-react"

interface AboutImage {
  src: string
  alt: string
}

interface AboutSectionProps {
  componentId?: string
  sectionLabel: string
  heading: string
  description: string
  visionHeading: string
  vision: string
  missionHeading: string
  mission: string[]
  keyValuesHeading: string
  keyValues: string[]
  image?: AboutImage
  _sectionId?: number
}

export default function AboutSection({
  sectionLabel,
  heading,
  description,
  visionHeading,
  vision,
  missionHeading,
  mission,
  keyValuesHeading,
  keyValues,
  image
}: AboutSectionProps) {
  
  const safeMission = Array.isArray(mission) ? mission : [];
  const safeKeyValues = Array.isArray(keyValues) ? keyValues : [];

  return (
    <section id="about" className="py-16 md:py-24 bg-darkBg overflow-hidden relative">
      {/* Dynamic Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" 
      />
      
      {/* Floating Decorative Icons (Breaking the edges) */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-20 right-[10%] text-secondary/20 hidden lg:block"
      >
        <Shield size={120} strokeWidth={0.5} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute bottom-40 left-[5%] text-primary/10 hidden lg:block"
      >
        <Zap size={100} strokeWidth={0.5} />
      </motion.div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col lg:flex-row gap-20 lg:items-center">
          
          {/* LEFT: Content & Key Values */}
          <div className="w-full lg:w-1/2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-secondary/50" />
                <span className="text-[12px] font-black tracking-[0.3em] text-secondary uppercase">
                  {sectionLabel || "About Us"}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                {heading}
              </h2>
              
              <div className="text-lg text-gray-400 leading-relaxed font-light space-y-4">
                {description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Values - Floating Organic Layout (No Box) */}
            <div className="space-y-8 pt-4">
               <h4 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase">
                 {keyValuesHeading}
               </h4>
               <div className="flex flex-wrap gap-4">
                 {safeKeyValues.map((value, idx) => (
                   <motion.div
                     key={idx}
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:border-secondary transition-all cursor-default"
                   >
                     {value}
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>

          {/* RIGHT: Asymmetrical Image Reveal */}
          <div className="w-full lg:w-1/2 relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-[4rem] group-hover:rounded-t-[4rem] group-hover:rounded-b-[14rem] transition-all duration-1000 ease-in-out shadow-2xl"
            >
              {image?.src && (
                <Image
                  src={image.src}
                  alt={image.alt || ""}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              )}
              {/* Internal Shadow Overlays */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </motion.div>

            {/* Experience Flare Element (Organic) */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="absolute -bottom-10 -left-10 md:-left-20 bg-gradient-to-br from-primary to-secondary p-[1px] rounded-[3rem] shadow-glow z-20"
            >
               <div className="bg-darkBg rounded-[2.9rem] px-8 py-10 text-center">
                 <p className="text-4xl font-black text-white mb-2">12+</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Years of Excellence</p>
               </div>
            </motion.div>
          </div>
        </div>

        {/* Vision & Mission Row - Deep Glass (Organic Shapes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative p-12 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[4rem] rounded-tr-none flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-500"
           >
             <div className="absolute top-10 right-10 text-secondary/10 group-hover:text-secondary/20 transition-colors">
                <Lightbulb size={60} />
             </div>
             <div className="space-y-6">
                <h4 className="text-sm font-black tracking-widest text-secondary uppercase italic">{visionHeading}</h4>
                <p className="text-xl font-light text-white leading-relaxed">"{vision}"</p>
             </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="relative p-12 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[4rem] rounded-bl-none flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-500"
           >
             <div className="absolute top-10 right-10 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Target size={60} />
             </div>
             <div className="space-y-8">
                <h4 className="text-sm font-black tracking-widest text-primary uppercase italic">{missionHeading}</h4>
                <ul className="space-y-4">
                  {safeMission.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-400 font-light">
                      <Heart size={16} className="text-secondary/60 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
             </div>
           </motion.div>
        </div>

      </div>
    </section>
  )
}