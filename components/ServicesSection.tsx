'use client'

import { useState } from "react"
import Image from "next/image"
import ServicesWheel from "./ServicesWheel"

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  image?: string
}

interface Props {
  heading: string
  description: string
  services: ServiceItem[]
}

export default function ServicesSection({
  heading,
  description,
  services
}: Props) {

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-28 bg-[#0f172a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-semibold mb-6 tracking-tight">
            {heading}
          </h2>
          <p className="text-blue-200/70 leading-relaxed text-lg">
            {description}
          </p>
        </div>

        {/* MAIN DISPLAY AREA */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: IMAGE & DESCRIPTION */}
          <div className="flex flex-col items-center justify-center space-y-10 order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center bg-blue-500/5 rounded-3xl border border-blue-500/10 p-12 shadow-inner">
              {services[activeIndex].image && (
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  width={320}
                  height={320}
                  className="object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                />
              )}
            </div>
            
            <div className="text-center max-w-md bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                {services[activeIndex].title}
              </h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">
                {services[activeIndex].description}
              </p>
            </div>
          </div>

          {/* RIGHT: THE SPEEDOMETER WHEEL */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <ServicesWheel
              services={services}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>

        </div>
      </div>
    </section>
  )
}