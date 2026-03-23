'use client'

import React from "react"
import { MapPin, Mail, Phone, Send } from "lucide-react"
import { motion } from "framer-motion"

interface ContactSectionProps {
  componentId?: string
  sectionLabel: string
  heading: string
  subheading: string
  phones: string[]
  emails: string[]
  address: string
  mapEmbedUrl: string
  _sectionId?: number
}

export default function ContactSection({
  sectionLabel,
  heading,
  subheading,
  phones,
  emails,
  address,
  mapEmbedUrl
}: ContactSectionProps) {

  return (
    <section id="contact" className="py-16 md:py-24 bg-darkBg relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header (Organic) */}
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
             <span className="w-12 h-[1px] bg-secondary/50" />
             <span className="text-[12px] font-black tracking-[0.3em] text-secondary uppercase">
               {sectionLabel || "Connect with us"}
             </span>
             <span className="w-12 h-[1px] bg-secondary/50" />
          </motion.div>

          <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {heading}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Unified Glassmorphic Panel (The Un-boxing) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full min-h-[700px] bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] border border-white/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-stretch"
        >
          
          {/* LEFT: Info (Floating on Glass) */}
          <div className="relative z-20 w-full lg:w-2/5 p-12 lg:p-16 flex flex-col justify-between space-y-16 bg-gradient-to-r from-slate-950/60 to-transparent">
             <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-glow border border-secondary/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">Inquiries</p>
                    {phones.map((p, i) => (
                      <a key={i} href={`tel:${p}`} className="block text-xl font-bold text-white hover:text-secondary transition-colors mb-1">{p}</a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-glow border border-primary/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">Collaboration</p>
                    {emails.map((e, i) => (
                      <a key={i} href={`mailto:${e}`} className="block text-xl font-bold text-white hover:text-primary transition-colors mb-1">{e}</a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">Presence</p>
                    <p className="text-lg font-light text-gray-300 leading-relaxed max-w-[280px]">{address}</p>
                  </div>
                </div>
             </div>

             {/* Simple visual separator for mobile */}
             <div className="h-[1px] w-full bg-white/5 lg:hidden" />
          </div>

          {/* RIGHT: Form (Minimal, Un-boxed) */}
          <div className="relative z-20 w-full lg:w-3/5 p-12 lg:p-20 bg-slate-900/40 backdrop-blur-xl border-l border-white/5">
              <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
                 Project Briefing
                 <span className="w-16 h-[1px] bg-secondary" />
              </h3>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/[0.03] border-b border-white/10 outline-none px-0 py-4 text-white placeholder-gray-600 focus:border-secondary transition-all font-light text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Business Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/[0.03] border-b border-white/10 outline-none px-0 py-4 text-white placeholder-gray-600 focus:border-secondary transition-all font-light text-base"
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/[0.03] border-b border-white/10 outline-none px-0 py-4 text-white placeholder-gray-600 focus:border-secondary transition-all font-light text-lg resize-none"
                    placeholder="Tell us about your objectives..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8 pt-8">
                  <button 
                    type="submit"
                    className="group flex items-center gap-4 bg-secondary text-darkBg font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:bg-white transition-all shadow-glow"
                  >
                    Initiate Contact
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">
                    Typical response within 12 hours
                  </p>
                </div>
              </form>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
