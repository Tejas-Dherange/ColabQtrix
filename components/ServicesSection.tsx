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

    <section className="py-16 md:py-20 lg:py-24 text-gray-800 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-gray-900">
            {heading}
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {description}
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* LEFT SIDE */}
          <div className="flex flex-col items-center justify-center order-2 lg:order-1 space-y-3">

            <div className="relative w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px]">

              {services[activeIndex].image && (
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  width={320}
                  height={320}
                  className="object-contain w-full h-auto"
                />
              )}

            </div>

            <div className="text-center max-w-md">

              <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-1">
                {services[activeIndex].title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {services[activeIndex].description}
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center order-1 lg:order-2 gap-4">

            <h3 className="text-lg md:text-xl font-semibold text-blue-600 text-center">
              {services[activeIndex].title}
            </h3>

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