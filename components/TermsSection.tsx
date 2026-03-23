'use client'

import { motion } from "framer-motion"

interface TermsSectionProps {
  componentId?: string
  heading: string
  paragraphs: string[]
  sections: {
    title: string
    text: string
  }[]
  _sectionId?: number
}

export default function TermsSection({
  heading,
  paragraphs,
  sections
}: TermsSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-darkBg relative border-t border-slate-800/50">
      
      {/* Background grids/glows */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-6">
             <span className="w-10 h-[1px] bg-secondary/50 hidden sm:block" />
             <span className="text-[12px] font-bold tracking-[0.2em] text-secondary uppercase glow-border border border-secondary/20 px-4 py-1.5 rounded-full inline-block">
               Legal
             </span>
             <span className="w-10 h-[1px] bg-secondary/50 hidden sm:block" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            {heading}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="dark-card bg-slate-900/80 backdrop-blur-md rounded-[2rem] p-8 md:p-14 leading-[1.8] space-y-10 shadow-2xl shadow-black/50 border border-slate-800 relative overflow-hidden"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-6 text-gray-400 font-light text-[15px] md:text-[17px]">
            {paragraphs?.map((para, index) => (
              <p key={index}>
                {para}
              </p>
            ))}
          </div>

          {sections && sections.length > 0 && (
            <div className="space-y-10 pt-10 border-t border-slate-800/80">
              {sections.map((sec, index) => (
                <div key={index} className="space-y-3 group">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-white transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-gray-400 font-light text-[15px] md:text-[17px]">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>
          )}

        </motion.div>

      </div>
    </section>
  )
}
