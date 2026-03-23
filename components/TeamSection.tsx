'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TeamMemberImage {
  src: string
  alt?: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: TeamMemberImage
}

interface TeamSectionProps {
  sectionLabel?: string
  heading: string
  subheading?: string
  members: TeamMember[]
}

export default function TeamSection({
  sectionLabel,
  heading,
  subheading,
  members,
}: TeamSectionProps) {
  const safeMembers = Array.isArray(members) ? members : []

  return (
    <section id="team" className="py-16 md:py-24 bg-darkBg border-t border-slate-800/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px] -translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-10 h-[1px] bg-secondary/60" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-secondary uppercase">
              {sectionLabel || 'OUR TEAM'}
            </span>
            <span className="w-10 h-[1px] bg-secondary/60" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            {heading}
          </h2>

          {subheading && (
            <p className="text-gray-400 mt-5 leading-relaxed text-base md:text-lg font-light">
              {subheading}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {safeMembers.map((member, index) => (
            <motion.article
              key={member.id || `${member.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group bg-slate-900/70 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-secondary/40 transition-all duration-400 shadow-xl"
            >
              <div className="relative aspect-[4/4.2] overflow-hidden">
                {member.image?.src ? (
                  <Image
                    src={member.image.src}
                    alt={member.image.alt || member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg/90 via-darkBg/35 to-transparent" />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-white text-xl font-semibold tracking-tight">{member.name}</h3>
                <p className="text-secondary text-sm font-semibold uppercase tracking-[0.12em]">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
