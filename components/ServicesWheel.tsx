'use client'

import { useEffect, useState } from "react"
import { Code, BarChart, ServerCog, FlaskConical } from "lucide-react"

const iconMap: any = {
  code: Code,
  strategy: BarChart,
  support: ServerCog,
  research: FlaskConical
}

export default function ServicesWheel({
  services,
  activeIndex,
  setActiveIndex
}: any) {

  const [rotation, setRotation] = useState(0)

  const total = services.length
  const radius = 160
  const step = 360 / total

  useEffect(() => {

    const interval = setInterval(() => {

      setRotation(prev => prev - step)
      setActiveIndex((prev: number) => (prev + 1) % total)

    }, 4000)

    return () => clearInterval(interval)

  }, [step, total, setActiveIndex])

  return (

    <div className="flex justify-center items-center w-full">

      <div className="relative w-[320px] h-[200px] sm:w-[380px] sm:h-[240px] md:w-[420px] md:h-[260px] lg:w-[480px] lg:h-[300px] overflow-hidden flex justify-center items-end">

        <div className="absolute top-[40px] w-full h-full flex justify-center">

          <div
            className="relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              width: radius * 2,
              height: radius * 2,
              transition: "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >

            {/* PLAIN LIGHT BLUE ARC */}
            <div
              className="absolute inset-0 rounded-full border-[55px] sm:border-[60px] md:border-[65px] lg:border-[70px] border-transparent"
              style={{
                background: "#93c5fd",
                maskImage: "radial-gradient(circle, transparent 110px, black 111px)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 110px, black 111px)"
              }}
            />

            {/* ICONS */}
            {services.map((service: any, index: number) => {

              const Icon = iconMap[service.icon] || Code
              const isActive = index === activeIndex

              const angle = (360 / total) * index

              const x = radius * Math.cos((angle - 90) * Math.PI / 180)
              const y = radius * Math.sin((angle - 90) * Math.PI / 180)

              return (

                <div
                  key={service.id}
                  className="absolute"
                  style={{
                    left: radius + x,
                    top: radius + y,
                    transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
                  }}
                >

                  <div
                    className={`p-3 sm:p-4 transition-all duration-500 flex items-center justify-center ${
                      isActive
                        ? "scale-125 text-blue-600"
                        : "text-gray-400"
                    }`}
                  >

                    <Icon size={26} />

                  </div>

                </div>

              )

            })}

          </div>

        </div>

        {/* ORIGINAL NEEDLE */}
        <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex justify-center items-start z-10">

          <div className="absolute top-10 transform -translate-y-1/2 flex flex-col items-center">

            {/* Needle base */}
            <div className="w-4 h-4 bg-red-600 rounded-full z-30 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>

            {/* Needle */}
            <div className="w-1.5 h-36 bg-gradient-to-t from-red-600 to-red-400 rounded-full -mt-2 z-20 shadow-[0_0_20px_rgba(220,38,38,0.3)]"></div>

          </div>

        </div>

      </div>

    </div>

  )

}