'use client'

import Image from 'next/image'

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
    <section className="bg-white pb-24">

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
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Text */}
          <div className="absolute inset-0 flex items-center">

            <div className="max-w-7xl mx-auto px-6 text-white">

              {/* <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {heading}
              </h1> */}

              {subtitle && (
                <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                  {subtitle}
                </p>
              )}

            </div>

          </div>

        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 mt-20">

        {/* SAME GRID AS YOUR ORIGINAL */}
        <div className="grid lg:grid-cols-2 gap-12">

          {jobs?.map((job, index) => (
            <div key={index}>

              {/* Job Heading */}
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Vacancies for {job.title}
              </h2>

              {/* Your Original Job Card */}
              <div className="bg-[#2b6361] text-white rounded-2xl p-8 leading-relaxed">

                <b>
                  <p className="font-semibold mb-3">{job.title}</p>

                  <p>Position: {job.position}</p>
                  <p>Location: {job.location}</p>
                  <p>Duration: {job.duration}</p>
                  <p>Stipend: {job.stipend}</p>
                  <p className="mb-6">Openings: {job.openings}</p>
                </b>

                <p className="text-xs font-semibold tracking-wider text-white/70 mb-2">
                  JOB DESCRIPTION
                </p>

                <p className="font-semibold underline mb-3">
                  About the Role:
                </p>

                <p className="mb-4">{job.about}</p>

                <p className="font-semibold underline mb-2">
                  Key Responsibilities:
                </p>

                <p className="mb-4">{job.responsibilities}</p>

                <p className="font-semibold underline mb-2">
                  Requirements:
                </p>

                {job.requirements.map((req, i) => (
                  <p key={i}>{req}</p>
                ))}

                {job.preferred && job.preferred.length > 0 && (
                  <>
                    <p className="font-semibold underline mt-4 mb-2">
                      Preferred (Nice-to-Have):
                    </p>

                    {job.preferred.map((pref, i) => (
                      <p key={i}>{pref}</p>
                    ))}
                  </>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Resume Section (same as yours) */}
      {resumeSection && (
        <div className="max-w-6xl mx-auto mt-24 px-6">

          <div className="relative w-full max-w-5xl mx-auto">

            <Image
              src={resumeSection.image.src}
              alt={resumeSection.image.alt}
              width={1200}
              height={260}
              className="w-full rounded-2xl"
            />

            <div className="absolute inset-0 flex items-center justify-between px-12 text-white text-sm md:text-base font-medium">

              {resumeSection.instructions.map((inst, i) => (
                <p key={i} className="text-center flex-1">
                  {inst}
                </p>
              ))}

            </div>

          </div>

        </div>
      )}

    </section>
  )
}