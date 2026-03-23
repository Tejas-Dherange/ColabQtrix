'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Job {
  title: string
  position: string
  location: string
  duration: string
  stipend: string
  openings: string
  about: string
  responsibilities: string
  requirements: string[]
  preferred?: string[]
}

interface CareersSectionProps {
  heading: string
  subtitle?: string
  heroImage?: string
  jobs: Job[]
  resumeSection: {
    image: { src: string; alt: string }
    instructions: string[]
  }
}

export default function CareersSection({
  heading,
  subtitle,
  heroImage,
  jobs,
  resumeSection,
}: CareersSectionProps) {

  return (
    <section className="bg-darkBg pb-16 border-t border-slate-800/50">

      {/* HERO IMAGE */}
      {heroImage && (
        <div className="relative w-full h-[340px] md:h-[420px] lg:h-[520px]">

          <Image
            src={heroImage}
            alt="Careers Hero"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-darkBg/80"></div>

          {/* Text */}
          <div className="absolute inset-0 flex items-center">

            <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 text-center flex flex-col items-center">

              {/* <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {heading}
              </h1> */}

              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-base md:text-xl text-gray-300 max-w-3xl font-light leading-relaxed"
                >
                  {subtitle}
                </motion.p>
              )}

            </div>

          </div>

        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-16 relative">

        {/* Ambient background glow near job cards */}
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -translate-x-1/2 pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-12 relative z-10">

          {jobs?.map((job, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              key={index} 
              className="flex flex-col"
            >

              {/* Job Heading */}
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 tracking-tight">
                <span className="w-8 h-[2px] bg-secondary" />
                Vacancies for <span className="text-secondary">{job.title}</span>
              </h2>

              {/* Job Card */}
              <div className="dark-card bg-slate-900/60 backdrop-blur-md rounded-[2rem] p-8 md:p-10 leading-[1.7] flex-grow group border border-slate-800 hover:border-secondary/30 transition-all duration-500 shadow-xl relative overflow-hidden">
                
                {/* Subtle highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="bg-slate-800/50 p-6 rounded-2xl mb-8 border border-slate-700/50">
                    <p className="text-lg font-bold mb-4 text-white">{job.title}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-300 text-[15px]">
                      <p><span className="text-gray-500 font-medium">Position:</span> {job.position}</p>
                      <p><span className="text-gray-500 font-medium">Location:</span> {job.location}</p>
                      <p><span className="text-gray-500 font-medium">Duration:</span> {job.duration}</p>
                      <p><span className="text-gray-500 font-medium">Stipend:</span> <span className="text-secondary font-medium">{job.stipend}</span></p>
                      <p><span className="text-gray-500 font-medium">Openings:</span> <span className="text-white font-medium">{job.openings}</span></p>
                    </div>
                  </div>

                  <p className="text-[11px] font-bold tracking-[0.2em] text-secondary/80 uppercase mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-secondary/80" />
                    Job Description
                  </p>

                  <h4 className="text-white font-semibold mb-3 tracking-wide">
                    About the Role:
                  </h4>
                  <p className="text-gray-400 font-light mb-8">{job.about}</p>

                  <h4 className="text-white font-semibold mb-3 tracking-wide">
                    Key Responsibilities:
                  </h4>
                  <p className="text-gray-400 font-light mb-8">{job.responsibilities}</p>

                  <h4 className="text-white font-semibold mb-3 tracking-wide">
                    Requirements:
                  </h4>
                  <ul className="list-none space-y-3 mb-8">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="text-gray-400 font-light flex items-start gap-3">
                        <span className="text-secondary mt-1.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>

                  {job.preferred && job.preferred.length > 0 && (
                    <>
                      <h4 className="text-white font-semibold mb-3 tracking-wide pt-4 border-t border-slate-800/80">
                        Preferred (Nice-to-Have):
                      </h4>
                      <ul className="list-none space-y-3">
                        {job.preferred.map((pref, i) => (
                          <li key={i} className="text-gray-400 font-light flex items-start gap-3">
                            <span className="text-slate-600 mt-1.5">•</span>
                            <span>{pref}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* Resume Section */}
      {resumeSection && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[1400px] mx-auto mt-20 px-6 lg:px-12"
        >

          <div className="relative w-full rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl group">

            <Image
              src={resumeSection.image.src}
              alt={resumeSection.image.alt}
              width={1400}
              height={300}
              className="w-full h-[260px] md:h-[300px] object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-darkBg/90 via-darkBg/60 to-darkBg/90 mix-blend-multiply" />

            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-16 lg:px-24 text-white text-base md:text-lg font-medium gap-6 md:gap-12 z-10 backdrop-blur-[2px]">

              {resumeSection.instructions.map((inst, i) => (
                <p key={i} className="text-center md:text-left flex-1 max-w-sm tracking-wide">
                  {inst}
                </p>
              ))}

            </div>
            
            {/* Inner border glow overlay */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none z-20" />

          </div>

        </motion.div>
      )}

    </section>
  )
}