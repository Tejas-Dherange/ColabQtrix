'use client'

import { motion } from "framer-motion"

interface PrivacyPolicySectionProps {
  componentId?: string
  heading: string
  effectiveDate: string
  paragraphs: string[]
  contactEmail: string
  _sectionId?: number
}

export default function PrivacyPolicySection({
  heading,
  effectiveDate,
  paragraphs,
  contactEmail
}: PrivacyPolicySectionProps) {
  return (
    <section className="py-24 md:py-32 bg-darkBg relative border-t border-slate-800/50">
      
      {/* Background grids/glows */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            {heading}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="dark-card bg-slate-900/80 backdrop-blur-md rounded-[2rem] p-8 md:p-14 leading-[1.8] space-y-8 shadow-2xl shadow-black/50 border border-slate-800 relative overflow-hidden"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-secondary/50" />
            <p className="font-bold text-secondary tracking-[0.2em] uppercase text-[11px] md:text-sm">
              Effective Date: {effectiveDate.replace('Effective Date: ', '')}
            </p>
          </div>
          
          <div className="space-y-6 text-gray-400 font-light text-[15px] md:text-[17px]">
            {paragraphs.map((para, index) => (
              <p key={index}>
                {para}
              </p>
            ))}
          </div>

          <div className="pt-10 mt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 font-light max-w-sm">
              For questions regarding this policy, please reach out to our team at any time.
            </p>
            <a 
              href={`mailto:${contactEmail}`} 
              className="px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-secondary hover:bg-secondary hover:text-darkBg hover:border-secondary transition-all font-semibold whitespace-nowrap"
            >
              {contactEmail}
            </a>
          </div>
          
        </motion.div>

      </div>
    </section>
  )
}
