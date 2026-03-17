'use client'

import Image from "next/image"

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
    <section id="founder" className="py-24 bg-gradient-to-b from-white to-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Badge */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-4 py-2 rounded-lg tracking-wide">
            {badge}
          </span>
        </div>


        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE */}
          <div className="flex justify-center relative">

            {/* Glow Background */}
            <div className="absolute w-[320px] h-[420px] bg-green-200/30 rounded-3xl blur-3xl"></div>

            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-[3/4] bg-gray-50">

              {founderImage?.src ? (
                <Image
                  src={founderImage.src}
                  alt={founderImage.alt || founderName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-300">

                  <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
                    <circle cx="50" cy="35" r="22" stroke="#d1d5db" strokeWidth="3" />
                    <path d="M10 90 Q10 65 50 65 Q90 65 90 90" stroke="#d1d5db" strokeWidth="3" fill="none" />
                  </svg>

                  <p className="text-sm text-gray-400 font-medium">
                    Founder Photo
                  </p>

                </div>
              )}

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="relative bg-[#2b6461] rounded-3xl p-10 md:p-12 text-white shadow-2xl">

            {/* Quote Icon */}
            <div className="absolute -top-8 left-8 text-[120px] text-white/10 font-serif">
              "
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              {heading}
            </h2>


            <div className="space-y-5 relative z-10">

              {paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-white/90 leading-relaxed text-base md:text-lg"
                >
                  {paragraph}
                </p>
              ))}

            </div>


            {/* Founder */}
            {/* <div className="mt-10 pt-6 border-t border-white/20">

              <p className="text-xl font-semibold tracking-wide">
                {founderName}
              </p>

              <p className="text-white/70 text-sm">
                {founderTitle}
              </p>

            </div> */}

          </div>

        </div>

      </div>

    </section>
  )
}