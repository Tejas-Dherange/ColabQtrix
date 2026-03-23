'use client'

import { motion, Variants } from "framer-motion"

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsSectionProps {
  componentId?: string;
  badge: string;
  heading: string;
  description: string;
  features: Feature[];
  _sectionId?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  strategy: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  support: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  research: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export default function WhyChooseUsSection({
  badge,
  heading,
  description,
  features,
}: WhyChooseUsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-darkBg overflow-hidden relative border-t border-slate-800/50">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
          }}
          className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-secondary/50 hidden sm:block" />
              <span className="text-[12px] font-bold tracking-[0.2em] text-secondary uppercase glow-border border border-secondary/20 px-4 py-1.5 rounded-full inline-block">
                {badge}
              </span>
              <span className="w-10 h-[1px] bg-secondary/50 hidden sm:block" />
            </div>
          </motion.div>

          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
          >
            {heading}
          </motion.h2>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-base text-gray-400 leading-[1.6] max-w-2xl mx-auto font-light"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={item}
              key={feature.id}
              className="dark-card bg-slate-900/50 backdrop-blur-sm p-8 group relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-darkBg transition-colors duration-500 mb-8 border border-slate-700 group-hover:border-transparent shadow-lg">
                  {ICON_MAP[feature.icon] || (
                    <span className="font-bold text-lg">{index + 1}</span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-[15px] text-gray-400 leading-[1.7] font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
