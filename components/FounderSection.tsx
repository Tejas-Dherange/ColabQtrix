'use client'

import Image from "next/image"
import { motion } from "framer-motion"

interface FounderImage {
  src: string
  alt: string
}

interface FounderSectionProps {
  badge: string
  heading: string
  quote: string[] | string
  founderName: string
  founderTitle: string
  founderImage?: FounderImage
}

export default function FounderSection({
  badge,
  heading,
  quote,
  founderName,
  founderTitle,
  founderImage
}: FounderSectionProps) {

  const paragraphs = Array.isArray(quote) ? quote : [quote]

  return (
    <section id="founder" className="py-16 md:py-24 bg-darkBg overflow-hidden relative border-t border-slate-800/50">

      {/* Decorative Grid Line */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Badge */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-3"
          >
            <span className="w-10 h-[1px] bg-secondary/50 hidden md:block" />
            <span className="text-[12px] font-bold tracking-[0.2em] text-secondary uppercase glow-border border border-secondary/20 px-4 py-1.5 rounded-full inline-block">
              {badge}
            </span>
            <span className="w-10 h-[1px] bg-secondary/50 hidden md:block" />
          </motion.div>
        </div>


        <div className="flex justify-center items-center w-full">


          {/* CENTERED POSTER Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
            }}
            className="relative w-full max-w-5xl dark-card bg-slate-900/80 rounded-[2rem] p-10 md:p-16 lg:p-20 text-white shadow-2xl shadow-black/50 overflow-hidden border border-slate-800 text-center flex flex-col items-center group"
          >

            {/* Internal subtle glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-secondary/20 transition-colors duration-1000" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000" />
            
            {/* Quote Icon */}
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } } }}
              className="absolute -top-10 left-10 md:left-20 text-[160px] text-slate-800/60 font-serif leading-none pointer-events-none select-none"
            >
              "
            </motion.div>

            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-[1.2] text-white tracking-tight relative z-10 max-w-4xl"
            >
              {heading}
            </motion.h2>


            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="space-y-8 relative z-10 max-w-4xl"
            >
              {paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                  className="text-gray-300 font-light leading-[1.8] text-base md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>


            {/* Founder Info */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="mt-10 pt-6 border-t border-slate-800/80 inline-flex flex-col items-center relative z-10 w-full max-w-lg"
            >
              <p className="text-2xl font-bold tracking-wide text-white">
                {founderName}
              </p>
              <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mt-2">
                {founderTitle}
              </p>
            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  )
}